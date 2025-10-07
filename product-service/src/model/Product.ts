import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    id: number;
    title: string;
    price: string;
    stock_status: string;
    stock_quantity?: number;
    category?: string;
    tags?: string[];
    on_sale: boolean;
    created_at: string;
}

const ProductSchema: Schema = new Schema({
    id: Number,
    title: String,
    price: String,
    stock_status: String,
    stock_quantity: Number,
    category: String,
    tags: [String],
    on_sale: Boolean,
    created_at: String,
});

export default mongoose.model<IProduct>("Product", ProductSchema);
