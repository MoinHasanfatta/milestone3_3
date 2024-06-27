const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
