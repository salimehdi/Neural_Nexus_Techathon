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
    name: { type: String, default: null },
    email: { type: String, unique: true },
    profilePic: { type: String, default: null },
    age: { type: Number, default: null },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: null },
    height: { type: Number, default: null }, // in cm
    weight: { type: Number, default: null }, // in kg
    activityLevel: { type: String, enum: ["Sedentary", "Light", "Moderate", "Very Active"],default: null },
    target: { type: String, enum: ["Hard Gain", "Gain", "Maintain", "Loss", "Hard Loss"], default: null },
    mealsPerDay: { type: Number, enum: [1, 2, 3, 4], default: null },
    allergies: { type: String, default: null }, // comma-separated values
    sleeping: {
        time: { type: String, default: null },
        schedule: { type: String, default: null },
        feedback: { type: String, default: null }
    },
    food_intake: [{
        time: { type: String },
        type: { type: String},
        meal_name: { type: String},
        cal: { type: Number },
        taste: { type: Number, enum: [0, 5, 10] }
    }],
    exercise_done: [{
        time: { type: String},
        type: { type: String},
        exercise_name: { type: String},
        cal_burnt: { type: Number},
        feeling_after_exercise: { type: String, enum: ["Exhausted", "Fresh"]}
    }],
}, { timestamps: true });

export default mongoose.model("User", UserSchema);