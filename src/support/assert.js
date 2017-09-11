const Request = require('./request');
const Utils = require('./utils');
const Storage = require('./storage');

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
}

module.exports = Assert;
