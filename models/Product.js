import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
     name: {
          type: String,
          requiredd: true
     }, description: {
          type: String,
          required: true
     }, price: {
          type: Number,
          required: true
     }, quantity: {
          type: Number,
          required: true
     }, active: {
          type: Boolean,
          default: true
     }, image: {
          type: [String],
          required: true
     }, department: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'department',
          required: true
     }
},
     {
          timestamps: true
     }
)

const ProductModel = mongoose.model('product', ProductSchema);

export default ProductModel;