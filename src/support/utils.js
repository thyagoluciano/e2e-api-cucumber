
const Dom = require('xmldom').DOMParser;
const jsonPath = require('JSONPath');
const select = require('xpath.js');
const prettyJson = require('prettyjson');
const isJson = require('is-json');
const fs = require('fs');
const Storage = require('./storage');

const xmlAttributeNodeType = 2;

class Utils {
    static getContentType(content) {
        try {
            JSON.parse(content);
            return 'json';
        } catch (e) {
            try {
                new Dom().parseFromString(content);
                return 'xml';
            } catch (err) {
                return err;
            }
        }
    }

    static prettyPrintJson(json) {
        const stepContext = {};
        const output = {
            stepContext,
            testOutput: json,
        };

        return prettyJson.render(output, {
            noColor: true,
        });
    }

    static replaceVariables(resourceParam, object = Storage.getGlobalVariable(), variableChar = '`') {
        let resource = resourceParam;
        const matchReg = new RegExp(`${variableChar}(.*?)${variableChar}`, 'g');
        const replaceReg = new RegExp(`${variableChar}`, 'g');
        const variaveis = (isJson(JSON.stringify(resource))) ? JSON.stringify(resource).match(matchReg) : resource.match(matchReg);

        if (variaveis) {
            variaveis.map((value) => {
                const name = value.replace(replaceReg, '');
                const matchRegValue = new RegExp(`${variableChar}${name}${variableChar}`);
                resource = (isJson(JSON.stringify(resource))) ?
                    JSON.stringify(resource).replace(matchRegValue, object[name]) :
                    resource.replace(matchRegValue, object[name]);
                return resource;
            });
            Storage.setGlobalVariable("requestJson", resource);
        }
        return resource;
    }

    static evaluatePath(pathParam, content) {
        const contentType = this.getContentType(content);

        switch (contentType) {
            case 'json':
                return this.evaluateJsonPath(pathParam, content);
            case 'xml':
                return this.evaluateXPath(pathParam, content);
            default:
                return null;
        }
    }

    static evaluateJsonPath(pathParam, content) {
        const contentJson = JSON.parse(content);
        const evalResult = jsonPath({ resultType: 'all' }, pathParam, contentJson);
        return (evalResult.length > 0) ? evalResult[0].value : null;
    }

    static evaluateXPath(pathParam, content) {
        const xmlDocument = new Dom().parseFromString(content);
        const node = select(xmlDocument, pathParam)[0];
        if (node.nodeType === xmlAttributeNodeType) {
            return node.value;
        }
        return node.firstChild.data;
    }

    static pipeFileContentsToRequestBody(fileParam, callback) {
        fs.readFile(fileParam, 'utf8', callback);
    }

    static base64Encode(str) {
        return new Buffer(str).toString('base64');
    }
}

module.exports = Utils;
