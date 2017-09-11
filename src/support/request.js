const request = require('request');
const isJson = require('is-json');
const util = require('util');

class Request {
    static init(domain) {
        this.domain = domain || 'http://localhost';
        this.headers = {};
        this.cookies = [];
        this.httpResponse = {};
        this.requestBody = '';
        this.queryParameters = {};
        this.formParameters = {};
        this.debug = false;

        return this;
    }

    static setDomain(domain) {
        this.domain = domain;
        return this;
    }

    static setDebug(debug) {
        this.debug = debug;
        return this;
    }

    static setRequestHeader(name, value) {
        let valuesArray = [];

        if (this.headers[name]) {
            valuesArray = this.headers[name].split(',');
        }

        valuesArray.push(value);
        this.headers[name] = valuesArray.join(',');

        return this;
    }

    static setCookie(cookie) {
        this.cookies.push(cookie);
        return this;
    }

    static setRequestBody(body) {
        this.requestBody = body;
        return this;
    }

    static setQueryParameters(queryParameters) {
        queryParameters.forEach((element) => {
            this.queryParameters[element.parameter] = element.value;
        }, this);

        return this;
    }

    static setFormParameters(formParameters) {
        formParameters.forEach((element) => {
            this.formParameters[element.parameter] = element.value;
        }, this);

        return this;
    }

    static removeRequestHeader(name) {
        delete this.headers[name];
        return this;
    }

    static getHeader() {
        return this.headers;
    }

    static getResponseObject() {
        return this.httpResponse;
    }

    static sendRequest(method, resource, done) {
        const self = this;
        const options = {
            url: `${this.domain}${resource}`,
            method,
            headers: this.headers,
            qs: this.queryParameters,
        };

        if (this.requestBody.length > 0) {
            options.body = this.requestBody;
        } else if (Object.keys(this.formParameters).length > 0) {
            options.form = this.formParameters;
        }

        const cookieJar = request.jar();
        this.cookies.forEach((cookie) => {
            cookieJar.setCookie(request.cookie(cookie), this.domain);
        }, this);

        options.jar = cookieJar;

        if (method !== 'OPTIONS') {
            options.followRedirect = false;
        }

        if (this.debug) {
            console.log(util.inspect(options, false, null));
        }

        request(options, (error, response) => {
            if (error) {
                return done(error);
            }

            self.httpResponse = response;
            return done(null, response);
        });
    }
}

module.exports = Request;
