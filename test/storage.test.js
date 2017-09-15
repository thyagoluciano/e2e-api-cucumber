const { Storage } = require('../src/support/index');

describe('e2e.storage', () => {
    test('Add variable quantity into global storage with value 1000', () => {
        Storage.setGlobalVariable('quantity', 1000);
        expect(Storage.getGlobalVariableByName('quantity')).toBe(1000);
    });

    test('validate if an object is stored in storage', () => {
        expect.objectContaining(Storage.getGlobalVariable());
    });
});
