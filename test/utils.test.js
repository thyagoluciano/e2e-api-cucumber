const { Utils, Storage } = require('../src/support/index');

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
            const result = Utils.prettyPrintJson({ id: 10 });
            expect.objectContaining(result);
        });
    });

    describe('replaceVariables', () => {
        test('', () => {
            const obj = '{"id": #id#, "nome": "#nome#"}';
            const response = JSON.parse(Utils.replaceVariables(obj, { id: 10, nome: 'thyago' }, '#'));
            expect(response.id).toBe(10);
            expect(response.nome).toBe('thyago');
        });
        test('', () => {
            const obj = '{"id": `id`, "nome": "`nome`"}';
            const response = JSON.parse(Utils.replaceVariables(obj, { id: 10, nome: 'thyago' }));
            expect(response.id).toBe(10);
            expect(response.nome).toBe('thyago');
        });

        test('', () => {
            Storage.setGlobalVariable('id', 10);
            Storage.setGlobalVariable('nome', 'thyago');
            const obj = '{"id": `id`, "nome": "`nome`"}';
            const response = JSON.parse(Utils.replaceVariables(obj));
            expect(response.id).toBe(10);
            expect(response.nome).toBe('thyago');
        });
    });
});
