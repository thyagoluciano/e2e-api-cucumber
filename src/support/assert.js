const Request = require('./request');
const Utils = require('./utils');

class Assert {
    static callbackWithAssertion(callback, assertion) {
        if (assertion.success) callback();
        callback(Utils.prettyPrintJson(assertion));
    }

    static getAssertionResult(success, expected, actual) {
        return {
            success,
            expected,
            actual,
            response: {
                statusCode: Request.getResponseObject().statusCode,
                headers: Request.getResponseObject().headers,
                body: Request.getResponseObject().body,
            },
        };
    }

    static assertResponseValue(valuePath, value) {
        const success = (valuePath === value);
        return this.getAssertionResult(success, valuePath, value);
    }

    static assertResponseCode(responseCode) {
        const realResponseCode = Request.getResponseObject().statusCode.toString();
        const success = (realResponseCode === responseCode);
        return this.getAssertionResult(success, responseCode, realResponseCode);
    }

    static assertResponseBodyContentType(contentType) {
        const realContentType = Utils.getContentType(Request.getResponseObject().body);
        const success = (realContentType === contentType);
        return this.getAssertionResult(success, contentType, realContentType);
    }

    static assertHeaderValue(header, expression) {
        const realHeaderValue = Request.getResponseObject().headers[header.toLowerCase()];
        const regex = new RegExp(expression);
        const success = (regex.test(realHeaderValue));
        return this.getAssertionResult(success, expression, realHeaderValue, this);
    }

    static assertResponseBodyContainsExpression(expression) {
        const regex = new RegExp(expression);
        const success = regex.test(Request.getResponseObject().body);
        return this.getAssertionResult(success, expression, null, this);
    }

    static assertPathInResponseBodyMatchesExpression(path, regexp) {
        const regExpObject = new RegExp(regexp);
        const evalValue = Utils.evaluatePath(path, Request.getResponseObject().body);
        const success = regExpObject.test(evalValue);
        return this.getAssertionResult(success, regexp, evalValue, this);
    }
}

module.exports = Assert;
