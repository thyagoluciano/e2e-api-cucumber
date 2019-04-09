const { Request, Storage, Utils } = require('../support/index');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given }) => {
    Given(/^(?:I set|que eu defino a chave) (.*) (?:header to|no headers com o valor) (.*)$/, (headerName, headerValue, callback) => {
        Request.setRequestHeader(
            Utils.replaceVariables(headerName),
            Utils.replaceVariables(headerValue)
        );
        callback();
    });

    Given(/^(?:I set cookie to|que eu coloque cookie para) (.*)$/, (cookie, callback) => {
        Request.setCookie(cookie);
        callback();
    });

    Given(/^(?:I set headers to|que eu coloque no headers)$/, (headers, callback) => {
        headers.hashes().forEach((h) => {
            Request.setRequestHeader(
                Utils.replaceVariables(h.name),
                Utils.replaceVariables(h.value)
            );
        });
        callback();
    });

    Given(/^(?:I set body to|que eu coloque no body) (.*)$/, (bodyValue, callback) => {
        Request.setRequestBody(Utils.replaceVariables(bodyValue));
        callback();
    });

    Given(/^(?:I pipe contents of file|que eu passo o conteudo do arquivo) (.*) (?:to body|para o body)$/, (file, callback) => {
        Utils.pipeFileContentsToRequestBody(Utils.replaceVariables(file), (err, data) => {
            if (err) throw err;
            Request.setRequestBody(Utils.replaceVariables(data));
            callback();
        });
    });

    Given(/^(?:I pipe contents of file|que eu passo o conteudo do arquivo) (.*) (?:as|como) (.*) (?:in global scope|na variavel global)$/, (file, name, callback) => {
        Utils.pipeFileContentsToRequestBody(Utils.replaceVariables(file), (err, data) => {
            if (err) throw err;
            Storage.setGlobalVariable(name, data);
            callback();
        });
    });

    Given(/^(?:I set query parameters to|que eu defini no parametro de consulta para)$/, (table, callback) => {
        table.hashes().forEach((t) => {
            Request.setQueryParameters(
                Utils.replaceVariables(t.name),
                Utils.replaceVariables(t.value)
            );
        });
        callback();
    });

    Given(/^(?:I set form parameters to|que eu defini no parametro de formulario para)$/, (table, callback) => {
        table.hashes().forEach((t) => {
            Request.setQueryParameters(
                Utils.replaceVariables(t.name),
                Utils.replaceVariables(t.value)
            );
        });
        callback();
    });

    Given(/^(?:I have basic authentication credentials|que eu tenha credencias basicas de autenticação) (.*) (?:and|e) (.*)$/, (username, password, callback) => {
        const user = Utils.replaceVariables(username);
        const pass = Utils.replaceVariables(password);
        const base64encode = Utils.base64Encode(`${user}:${pass}`);
        Request.setRequestHeader('Authorization', `Basic ${base64encode}`);
        callback();
    });

    Given(/^(?:I store the raw value|que eu armazeno o valor bruto) (.*) (?:as|como) (.*) (?:in global scope|na variavel global)$/, (value, name, callback) => {
        Storage.setGlobalVariable(
            Utils.replaceVariables(name),
            Utils.replaceVariables(value)
        );
        callback();
    });

    Given(/^(?:I'll wait|que eu espere) (.*) (?:seconds|segundos)$/, (seconds, callback) => {
        setTimeout(() => {
            callback();
        }, (seconds * 1000));
    });
});
