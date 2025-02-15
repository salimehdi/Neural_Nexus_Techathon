import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user_id: { 
        type: String, 
        unique: true, 
        required: true, 
        default: function() {
            return `USER-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        }
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ["Admin", "User"], required: true },
    image_url: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
