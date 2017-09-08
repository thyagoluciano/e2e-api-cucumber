const Request = require('./request');
const Utils = require('./utils');

class Assert {
    static callbackWithAssertion(done, assertion) {
        if (assertion.success) done();
        done(Utils.prettyPrintJson(assertion));
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
