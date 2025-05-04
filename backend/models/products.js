import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    type: {
        type: String
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema); // mongoose will make it products

export default Product;