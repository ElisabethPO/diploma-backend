import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  extradescription: {type: String, required: true},
  price: {type: String, required: true},
  type: {type: String, required: true},
  subCategory: {type: String, required: true},
  picture: {type: String},
  color: {type: String},
  rating: { type: Number, default: 0 },
})

export default mongoose.model('Product', productSchema);
