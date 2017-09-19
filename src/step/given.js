const { Request, Storage, Utils } = require('../support/index');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given }) => {
    Given(/^I set (.*) header to (.*)$/, (headerName, headerValue, callback) => {
        Request.setRequestHeader(
            Utils.replaceVariables(headerName),
            Utils.replaceVariables(headerValue)
        );
        callback();
    });

    Given(/^I set cookie to (.*)$/, (cookie, callback) => {
        Request.setCookie(cookie);
        callback();
    });

    Given(/^I set headers to$/, (headers, callback) => {
        headers.hashes().forEach((h) => {
            Request.setRequestHeader(
                Utils.replaceVariables(h.name),
                Utils.replaceVariables(h.value)
            );
        });
        callback();
    });

    Given(/^I set body to (.*)$/, (bodyValue, callback) => {
        Request.setRequestBody(Utils.replaceVariables(bodyValue));
        callback();
    });

    Given(/^I pipe contents of file (.*) to body$/, (file, callback) => {
        Utils.pipeFileContentsToRequestBody(Utils.replaceVariables(file), (err, data) => {
            if (err) throw err;
            Request.setRequestBody(Utils.replaceVariables(data));
            callback();
        });
    });

    Given(/^I pipe contents of file (.*) as (.*) in global scope$/, (file, name, callback) => {
        Utils.pipeFileContentsToRequestBody(Utils.replaceVariables(file), (err, data) => {
            if (err) throw err;
            Storage.setGlobalVariable(name, data);
            callback();
        });
    });

    Given(/^I set query parameters to$/, (table, callback) => {
        table.hashes().forEach((t) => {
            Request.setQueryParameters(
                Utils.replaceVariables(t.name),
                Utils.replaceVariables(t.value)
            );
        });
        callback();
    });

    Given(/^I set form parameters to$/, (table, callback) => {
        table.hashes().forEach((t) => {
            Request.setQueryParameters(
                Utils.replaceVariables(t.name),
                Utils.replaceVariables(t.value)
            );
        });
        callback();
    });

    Given(/^I have basic authentication credentials (.*) and (.*)$/, (username, password, callback) => {
        const user = Utils.replaceVariables(username);
        const pass = Utils.replaceVariables(password);
        const base64encode = Utils.base64Encode(`${user}:${pass}`);
        Request.setRequestHeader('Authorization', `Basic ${base64encode}`);
        callback();
    });

    Given(/^I store the raw value (.*) as (.*) in global scope$/, (value, name, callback) => {
        Storage.setGlobalVariable(
            Utils.replaceVariables(name),
            Utils.replaceVariables(value)
        );
        callback();
    });

    Given(/^I'll wait (.*) seconds$/, (seconds, callback) => {
        setTimeout(() => {
            callback();
        }, (seconds * 1000));
    });
});
