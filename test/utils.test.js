const { Utils } = require('../src/support/index');

describe('e2e.storage', () => {
    test('should be return the json type', () => {
        const objeto = { id: 10 };
        expect(Utils.getContentType(JSON.stringify(objeto))).toBe('json');
    });

    test('should be return the xml type', () => {
        const xml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <aluno situacao="Não Matriculado">
            <nome>Tadeu</nome>
            <idade>42</idade>
        </aluno>`;

        expect(Utils.getContentType(xml).toBe('json'));
    });

    test('Should be convert to base64', () => {
        expect(Utils.base64Encode('password')).toBe('cGFzc3dvcmQ=');
    });
});
