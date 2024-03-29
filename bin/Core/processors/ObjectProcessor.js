class ObjectProcessor {
    static MapModelFromObject(model, obj) {
        for (var prop in obj) {
            if (prop in model) {
                if (model[prop] !== obj[prop] && obj[prop] !== null && obj[prop] !== undefined) {
                    model[prop] = obj[prop];
                }
            }
        }
        return model;
    }
}
module.exports = ObjectProcessor;