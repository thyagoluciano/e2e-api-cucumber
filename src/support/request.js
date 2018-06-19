const request = require('request');
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
        this.uploadParameters = null;
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

    static setQueryParameters(name, value) {
        this.queryParameters[name] = value;
        return this;
    }

    static setFormParameters(name, value) {
        this.formParameters[name] = value;
        return this;
    }

    static removeRequestHeader(name) {
        delete this.headers[name];
        return this;
    }

    static uploadRequest(uploadObject) {
        this.uploadParameters = uploadObject
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
        } 
        
        if (Object.keys(this.formParameters).length > 0) {
            options.form = this.formParameters;
        }

        if (this.uploadParameters !== null) {
            options.formData = this.uploadParameters
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
