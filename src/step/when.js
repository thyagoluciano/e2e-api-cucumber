const { Request, Storage, Utils } = require('../support/index');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ When }) => {
    When(/^I GET (.*)$/, (resourceParam, callback) => {
        const resource = Utils.replaceVariables(resourceParam, Storage.getGlobalVariable());
        Request.sendRequest('GET', resource, (error) => {
            if (error) callback(new Error(error));
            callback();
        });
    });

    When(/^I POST to (.*)$/, (resourceParam, callback) => {
        const resource = Utils.replaceVariables(resourceParam, Storage.getGlobalVariable());
        Request.sendRequest('POST', resource, (error) => {
            if (error) callback(new Error(error));
            callback();
        });
    });

    When(/^I PUT (.*)$/, (resourceParam, callback) => {
        const resource = Utils.replaceVariables(resourceParam, Storage.getGlobalVariable());
        Request.sendRequest('PUT', resource, (error) => {
            if (error) callback(new Error(error));
            callback();
        });
    });

    When(/^I DELETE (.*)$/, (resourceParam, callback) => {
        const resource = Utils.replaceVariables(resourceParam, Storage.getGlobalVariable());
        Request.sendRequest('DELETE', resource, (error) => {
            if (error) callback(new Error(error));
            callback();
        });
    });

    When(/^I PATCH (.*)$/, (resourceParam, callback) => {
        const resource = Utils.replaceVariables(resourceParam, Storage.getGlobalVariable());
        Request.sendRequest('PATCH', resource, (error) => {
            if (error) callback(new Error(error));
            callback();
        });
    });

    When(/^I request OPTIONS for (.*)$/, (resourceParam, callback) => {
        const resource = Utils.replaceVariables(resourceParam, Storage.getGlobalVariable());
        Request.sendRequest('OPTIONS', resource, (error) => {
            if (error) callback(new Error(error));
            callback();
        });
    });

    When(/^I set bearer token$/, (callback) => {

    });
});
