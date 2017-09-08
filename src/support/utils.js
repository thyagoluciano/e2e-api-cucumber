
const Dom = require('xmldom').DOMParser;
const jsonPath = require('JSONPath');
const select = require('xpath.js');
const prettyJson = require('prettyjson');
const fs = require('fs');

const xmlAttributeNodeType = 2;

class Utils {
    static isJsonString(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }

    static getContentType(content) {
        try {
            JSON.parse(content);
            return 'json';
        } catch (e) {
            try {
                new Dom().parseFromString(content);
                return 'xml';
            } catch (err) {
                return null;
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

    static replaceVariables(resource, object, variableChar = '`') {
        try {
            const matchReg = new RegExp(`${variableChar}(.*?)${variableChar}`, 'g');
            const replaceReg = new RegExp(`${variableChar}`, 'g');
            const name = resource.match(matchReg).map(val => val.replace(replaceReg, ''))[0];
            return this.isJsonString(object[name]) ? resource.replace(matchReg, JSON.stringify(object[name])) : resource.replace(matchReg, object[name]);
        } catch (e) {
            return resource;
        }
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

    static pipeFileContentsToRequestBody(fileParam, done) {
        fs.readFile(fileParam, 'utf8', done);
    }
}

module.exports = Utils;
