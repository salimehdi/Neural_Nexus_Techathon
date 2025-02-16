import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    exercise_name: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const NotificationModel = mongoose.model("Notification", NotificationSchema);

export default NotificationModel;
