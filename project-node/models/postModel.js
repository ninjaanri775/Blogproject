const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: {
    type: [String], 
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);