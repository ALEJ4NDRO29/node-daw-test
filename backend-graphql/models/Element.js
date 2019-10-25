var mongoose = require('mongoose');

var ElementSchema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    type: String,
    title: String,
    description: String,
    rate: Number,
    tags: [{ type: String }],
}, { timestamps: true });


mongoose.model('Element', ElementSchema);