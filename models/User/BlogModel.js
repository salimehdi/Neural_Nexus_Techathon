import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    name: { type: String, required: true }, // Doctor's name
    tags: [{ type: String }] // Array of tags
}, { timestamps: true });

export default mongoose.model("Blog", BlogSchema);
