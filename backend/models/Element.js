var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var ElementSchema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    type: String,
    title: String,
    description: String,
    rate: Number,
    tags: [{ type: String }],
}, { timestamps: true });

ElementSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

ElementSchema.methods.slugify = function () {
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

ElementSchema.methods.toJSONFor = function () {
    return {
        type: this.type,
        title: this.title,
        description: this.description,
        rate: this.rate,
        tags: this.tags
    };
};

mongoose.model('Element', ElementSchema);