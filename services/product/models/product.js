import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    kode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
},{
    timestamps: true
});

export const Product = model('product',ProductSchema);