const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  games: [{
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Game' }],
});

module.exports = mongoose.model('Developer', developerSchema);
