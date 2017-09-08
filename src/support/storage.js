const globalVariable = {};

class Storage {
    static setGlobalVariable(name, value) {
        globalVariable[name] = value;
    }
    static getGlobalVariableByName(name) {
        return globalVariable[name];
    }
    static getGlobalVariable() {
        return globalVariable;
    }
}

module.exports = Storage;
