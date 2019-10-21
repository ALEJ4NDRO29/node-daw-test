var mongoose = require('mongoose');
var slug = require('slug');
var logger = require('log4js').getLogger()

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

ElementSchema.methods.like = function () {
    this.rate++;
    return this.save();
}

ElementSchema.methods.unlike = function () {
    if (this.rate > 0) {
        this.rate--;
    }
    return this.save();
}

/**
 * 
 * @param User mongo model 
 */
ElementSchema.methods.toJSONFor = function (user) {
    let resp = {
        slug: this.slug,
        type: this.type,
        title: this.title,
        description: this.description,
        rate: this.rate,
        tags: this.tags,
        isRated: user ? user.isRated(this) : false
    };

    return resp;
};

mongoose.model('Element', ElementSchema);