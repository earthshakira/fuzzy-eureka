const mongoose = require('mongoose');

const TShirtSchema = new mongoose.Schema({
  id: Number,
  firstname: String ,
  lastname: String,
  product: String,
  in_stock: Boolean,
  price: Number,
  url_key:String,
  meta_title: String,
  meta_keys: String,
  category: String
});

module.exports = mongoose.model('TShirt', TShirtSchema);
