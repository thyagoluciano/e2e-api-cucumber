const { Assert, Request, Storage, Utils } = require('../support/index');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Then }) => {
    Then(/^response code should be (.*)$/, (responseCode, callback) => {
        const assertion = Assert.assertResponseCode(responseCode);
        Assert.callbackWithAssertion(callback, assertion);
    });

    Then(/^response code should not be (.*)$/, (responseCode, callback) => {
        const assertion = Assert.assertResponseCode(responseCode);
        Assert.callbackWithAssertion(callback, assertion);
    });

    Then(/^response header (.*) should exist$/, (header, callback) => {
        const success = typeof Request.getResponseObject().headers[
            Utils.replaceVariables(header).toLowerCase()
        ] === 'undefined';

        Assert.callbackWithAssertion(callback, Assert.getAssertionResult(success, true, false));
    });

    Then(/^response header (.*) should not exist$/, (header, callback) => {
        const success = typeof Request.getResponseObject().headers[
            Utils.replaceVariables(header).toLowerCase()
        ] !== 'undefined';

        Assert.callbackWithAssertion(callback, Assert.getAssertionResult(success, true, false));
    });

    Then(/^response header (.*) should be (.*)$/, (header, expression, callback) => {
        Assert.callbackWithAssertion(
            callback,
            Assert.assertHeaderValue(
                Utils.replaceVariables(header),
                Utils.replaceVariables(expression)
            )
        );
    });

    Then(/^response header (.*) should not be (.*)$/, (header, expression, callback) => {
        Assert.callbackWithAssertion(
            callback,
            !Assert.assertHeaderValue(
                Utils.replaceVariables(header),
                Utils.replaceVariables(expression)
            )
        );
    });

    Then(/^response body should be valid (xml|json)$/, (contentType, callback) => {
        const assertion = Assert.assertResponseBodyContentType(contentType);
        Assert.callbackWithAssertion(callback, assertion);
    });

    Then(/^response body should contain (.*)$/, (expression, callback) => {
        Assert.callbackWithAssertion(
            callback,
            Assert.assertResponseBodyContainsExpression(
                Utils.replaceVariables(expression)
            )
        );
    });

    Then(/^response body should not contain (.*)$/, (expression, callback) => {
        Assert.callbackWithAssertion(
            callback,
            !Assert.assertResponseBodyContainsExpression(
                Utils.replaceVariables(expression)
            )
        );
    });

    Then(/^response body path (.*) should be (((?!of type).*))$/, (path, value, callback) => {
        Assert.callbackWithAssertion(
            callback,
            Assert.assertPathInResponseBodyMatchesExpression(
                Utils.replaceVariables(path),
                Utils.replaceVariables(value)
            )
        );
    });

    Then(/^response body path (.*) should not be (((?!of type).+))$/, (path, value, callback) => {
        Assert.callbackWithAssertion(
            callback,
            !Assert.assertPathInResponseBodyMatchesExpression(
                Utils.replaceVariables(path),
                Utils.replaceVariables(value)
            )
        );
    });

    Then(/^response body path (.*) should be of type array$/, (path, callback) => {
        const value = Utils.evaluatePath(
            Utils.replaceVariables(path),
            Request.getResponseObject().body
        );

        Assert.callbackWithAssertion(
            callback,
            Assert.getAssertionResult(
                Array.isArray(value),
                'array',
                typeof value
            )
        );
    });

    Then(/^response body path (.*) should be of type array with length (.*)$/, (path, lengthParam, callback) => {
        const value = Utils.evaluatePath(
            Utils.replaceVariables(path),
            Request.getResponseObject().body
        );
        const length = Utils.replaceVariables(lengthParam);

        let success = false;
        let actual = '?';

        if (Array.isArray(value)) {
            success = value.length.toString() === length;
            actual = value.length;
        }

        Assert.callbackWithAssertion(
            callback,
            Assert.getAssertionResult(
                success,
                length,
                actual
            )
        );
    });

    Then(/^I store the value of response header (.*) as (.*) in global scope$/, (headerName, variableName, callback) => {
        const value = Request.getResponseObject().heades[headerName.toLowerCase()];
        Storage.setGlobalVariable(variableName, value);
        callback();
    });

    Then(/^I store the value of body path (.*) as (.*) in global scope$/, (pathParam, variableName, callback) => {
        const value = Utils.evaluatePath(pathParam, Request.getResponseObject().body);
        Storage.setGlobalVariable(variableName, value);
        callback();
    });
});
