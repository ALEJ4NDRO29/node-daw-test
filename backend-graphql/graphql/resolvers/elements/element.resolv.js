var Element = require('mongoose').model('Element');

var resolv = {
    async element(slug) {
        var element = await Element.find(slug);
        return element;
    },
    async elements() {
        var elements = await Element.find();
        return elements;
    }
}

module.exports = resolv;