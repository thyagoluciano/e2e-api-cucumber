[![npm version](https://badge.fury.io/js/e2e-api-cucumber.svg)](https://badge.fury.io/js/e2e-api-cucumber)
[![NPM](https://nodei.co/npm/e2e-api-cucumber.png)](https://nodei.co/npm/e2e-api-cucumber/)


```
GIVEN:
    I set (.*) header to (.*)
    I set cookie to (.*)
    I set body to (.*)
    I pipe contents of file (.*) to body
    I have basic authentication credentials (.*) and (.*)
    I set bearer token
    I set query parameters to (data table with headers |name|value|)
    I set headers to (data table with headers |name|value|)
    I set form parameters to (data table with headers |name|value|)

WHEN:
    I GET $resource
    I POST to $resource
    I PUT $resource
    I DELETE $resource
    I PATCH $resource
    I request OPTIONS for $resource

THEN:
    response code should be (\d+)
    response code should not be (\d+)
    response header (.*) should exist
    response header (.*) should not exist
    response header (.*) should be (.*)
    response header (.*) should not be (.*)
    response body should be valid (xml|json)
    response body should contain (.*)
    response body should not contain (.*)
    response body path (.*) should be (.*)
    response body path (.*) should not be (.*)

    // TODO: response body path (.*) should be of type array
    // TODO: response body path (.*) should be of type array with length (\d+)
    // TODO: response body should be valid according to schema file (.*)
    // TODO: response body should be valid according to openapi description (.*) in file (.*)
    // TODO: I store the value of body path (.*) as access token
    // TODO: I store the value of response header (.*) as (.*) in scenario scope
    // TODO: I store the value of body path (.*) as (.*) in scenario scope
    // TODO: value of scenario variable (.*) should be (.*)
    // TODO: I store the value of response header (.*) as (.*) in global scope
    I store the value of body path (.*) as (.*) in global scope
```