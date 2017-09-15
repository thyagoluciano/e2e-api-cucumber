const { Utils } = require('../src/support/index');

describe('e2e.storage', () => {
    test('should be return the json type', () => {
        const objeto = { id: 10 };
        expect(Utils.getContentType(JSON.stringify(objeto))).toBe('json');
    });

    test('Should be convert to base64', () => {
        expect(Utils.base64Encode('password')).toBe('cGFzc3dvcmQ=');
    });

    describe('prettyPrintJson', () => {
        test('Should be return prettyJson.render', () => {
            const result = Utils.prettyPrintJson(obj);
            expect.objectContaining(result);
            expect(result.testOutput.id).toBe(10);
        });
    });
});
