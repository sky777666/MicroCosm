const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    //TODO: configure dataTypes and more entries if necessary
    name: {
      type: String,
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  });

  module.exports = mongoose.model("Categories", CategorySchema) 
