const { Assert, Request, Storage, Utils } = require('../support/index');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Then }) => {
    Then(/^(?:response code should be|o codigo de resposta deve ser) (.*)$/, (responseCode, callback) => {
        const assertion = Assert.assertResponseCode(responseCode);
        Assert.callbackWithAssertion(callback, assertion);
    });

    Then(/^(?:response code should not be|o codigo de resposta não deve ser) (.*)$/, (responseCode, callback) => {
        const assertion = Assert.assertResponseCode(responseCode);
        Assert.callbackWithAssertion(callback, assertion);
    });

    Then(/^(?:response header|o hearder da resposta) (.*) (?:should exist|deve existir)$/, (header, callback) => {
        const success = typeof Request.getResponseObject().headers[
            Utils.replaceVariables(header).toLowerCase()
        ] === 'undefined';

        Assert.callbackWithAssertion(callback, Assert.getAssertionResult(success, true, false));
    });

    Then(/^(?:response header|o header da resposta) (.*) (?:should not exist|não deve existir)$/, (header, callback) => {
        const success = typeof Request.getResponseObject().headers[
            Utils.replaceVariables(header).toLowerCase()
        ] !== 'undefined';

        Assert.callbackWithAssertion(callback, Assert.getAssertionResult(success, true, false));
    });

    Then(/^(?:response header|o header da resposta) (.*) (?:should be|deve ser) (.*)$/, (header, expression, callback) => {
        Assert.callbackWithAssertion(
            callback,
            Assert.assertHeaderValue(
                Utils.replaceVariables(header),
                Utils.replaceVariables(expression)
            )
        );
    });

    Then(/^(?:response header|o header da resposta) (.*) (?:should not be|não deve ser) (.*)$/, (header, expression, callback) => {
        Assert.callbackWithAssertion(
            callback,
            !Assert.assertHeaderValue(
                Utils.replaceVariables(header),
                Utils.replaceVariables(expression)
            )
        );
    });

    Then(/^(?:response body should be valid|o body da resposta deve ser um) (xml|json)$/, (contentType, callback) => {
        const assertion = Assert.assertResponseBodyContentType(contentType);
        Assert.callbackWithAssertion(callback, assertion);
    });

    Then(/^(?:response body should contain|o body da resposta deve conter) (.*)$/, (expression, callback) => {
        Assert.callbackWithAssertion(
            callback,
            Assert.assertResponseBodyContainsExpression(
                Utils.replaceVariables(expression)
            )
        );
    });

    Then(/^(?:response body should not contain|o body da resposta não deve conter) (.*)$/, (expression, callback) => {
        Assert.callbackWithAssertion(
            callback,
            !Assert.assertResponseBodyContainsExpression(
                Utils.replaceVariables(expression)
            )
        );
    });

    Then(/^(?:response body path|no caminho do body da resposta) (.*) (?:should be|deve ser) (((?!of type).*))$/, (path, value, callback) => {
        Assert.callbackWithAssertion(
            callback,
            Assert.assertPathInResponseBodyMatchesExpression(
                Utils.replaceVariables(path),
                Utils.replaceVariables(value)
            )
        );
    });

    Then(/^(?:response body path|no caminho do body da resposta) (.*) (?:should not be|não deve ser) (((?!of type).+))$/, (path, value, callback) => {
        Assert.callbackWithAssertion(
            callback,
            !Assert.assertPathInResponseBodyMatchesExpression(
                Utils.replaceVariables(path),
                Utils.replaceVariables(value)
            )
        );
    });

    Then(/^(?:response body path|no caminho do body da resposta) (.*) (?:should be of type array|deve ser um array)$/, (path, callback) => {
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

    Then(/^(?:response body path|no caminho do body da resposta) (.*) (?:should be of type array with length|deve ser um array com o tamanho de) (.*)$/, (path, lengthParam, callback) => {
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

    Then(/^(?:I store the value of response header|eu armazeno o valor do header da resposta) (.*) (?:as|como) (.*) (?:in global scope|na variavel global)$/, (headerName, variableName, callback) => {
        const value = Request.getResponseObject().headers[headerName.toLowerCase()];
        Storage.setGlobalVariable(variableName, value);
        callback();
    });

    Then(/^(?:I store the value of body path|eu armazeno o valor do body) (.*) (?:as|como) (.*) (?:in global scope|na variavel global)$/, (pathParam, variableName, callback) => {
        const value = Utils.evaluatePath(pathParam, Request.getResponseObject().body);
        Storage.setGlobalVariable(variableName, value);
        callback();
    });
});
