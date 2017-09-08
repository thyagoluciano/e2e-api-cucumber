const { Assert, Request, Storage, Utils } = require('../support/index');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Then }) => {
    Then(/^response header (.*) should exist$/, (header, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response header (.*) should not exist$/, (header, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response body should be valid (xml|json)$/, (contentType, callback) => {
        const assertion = Assert.assertResponseBodyContentType(contentType);
        Assert.callbackWithAssertion(callback, assertion);
    });

    Then(/^response code should be (.*)$/, (responseCode, callback) => {
        const assertion = Assert.assertResponseCode(responseCode);
        Assert.callbackWithAssertion(callback, assertion);
    });

    Then(/^response code should not be (.*)$/, (responseCode, callback) => {
        const assertion = Assert.assertResponseCode(responseCode);
        Assert.callbackWithAssertion(callback, assertion);
    });

    Then(/^response header (.*) should be (.*)$/, (header, expression, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response header (.*) should not be (.*)$/, (header, expression, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response body should contain (.*)$/, (expression, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response body should not contain (.*)$/, (expression, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response body path (.*) should be (((?!of type).*))$/, (path, value, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response body path (.*) should not be (((?!of type).+))$/, (path, value, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response body path (.*) should be of type array$/, (path, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response body path (.*) should be of type array with length (.*)$/, (path, length, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response body should be valid according to schema file (.*)$/, (schemaFile, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^response body should be valid according to openapi description (.*) in file (.*)$/, (definitionName, swaggerSpecFile, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^I store the value of body path (.*) as access token$/, (path, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^I store the value of response header (.*) as (.*) in global scope$/, (headerName, variableName, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^I store the value of body path (.*) as (.*) in global scope$/, (pathParam, variableName, callback) => {
        const path = Utils.replaceVariables(pathParam, Storage.getGlobalVariable());
        const value = Utils.evaluatePath(path, Request.getResponseObject().body);
        Storage.setGlobalVariable(variableName, value);
        callback();
    });

    Then(/^I store the value of response header (.*) as (.*) in scenario scope$/, (name, variable, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^I store the value of body path (.*) as (.*) in scenario scope$/, (path, variable, callback) => {
        // TODO: Falta implementar
        callback();
    });

    Then(/^value of scenario variable (.*) should be (.*)$/, (variableName, variableValue, callback) => {
        // TODO: Falta implementar
        callback();
    });
});
