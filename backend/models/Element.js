var mongoose = require('mongoose');
var slug = require('slug');

var ElementSchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    type: String,
    title: String,
    description: String,
    rate: Number,
    tags: [{type: String}],
}, {timestamps: true});

ElementSchema.methods.toJSONFor = function(){
    return {
        type: this.type,
        title: this.title,
        description: this.description,
        rate: this.rate,
        tags: this.tags
    };
  };

mongoose.model('Element', ElementSchema);