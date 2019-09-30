var mongoose = require('mongoose');

var ElementSchema = new mongoose.Schema({
    type: String,
    title: String,
    description: String,
    rate: Number,
    tags: [{type: String}],  
});

mongoose.model('Element', ElementSchema);