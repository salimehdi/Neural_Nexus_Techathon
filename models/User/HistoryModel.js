import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
    time: { 
        type: Date, 
        default: Date.now 
    },
    text: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }
}, { timestamps: true });

export default mongoose.model("History", HistorySchema);
