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
    name: { type: String, default: `User-${Math.random().toString(36).substr(2, 5).toUpperCase()}` },
    email: { type: String, unique: true },
    profilePic: { type: String, default: null },
    age: { type: Number, default: null },
    gender: { 
        type: String, 
        enum: ["Male", "Female", "Other"], 
        default: function() {
            return ["Male", "Female", "Other"][Math.floor(Math.random() * 3)];
        }
    },
    height: { type: Number, default: null }, // in cm
    weight: { type: Number, default: null }, // in kg
    bmi: { type: Number, default: null }, // BMI is also default null
    activityLevel: { 
        type: String, 
        enum: ["Sedentary", "Light", "Moderate", "Very Active"], 
        default: function() {
            return ["Sedentary", "Light", "Moderate", "Very Active"][Math.floor(Math.random() * 4)];
        }
    },
    target: { 
        type: String, 
        enum: ["Hard Gain", "Gain", "Maintain", "Loss", "Hard Loss"], 
        default: function() {
            return ["Hard Gain", "Gain", "Maintain", "Loss", "Hard Loss"][Math.floor(Math.random() * 5)];
        }
    },
    mealsPerDay: { 
        type: Number, 
        enum: [1, 2, 3, 4], 
        default: function() {
            return [1, 2, 3, 4][Math.floor(Math.random() * 4)];
        }
    },
    dietary_preferences: { 
        type: String, 
        enum: ["Veg", "Non-Veg", "Vegan"], default: "Veg"
    },
    allergies: { type: String, default: null }, // comma-separated values
    sleeping: {
        time: { type: String, default: null },
        schedule: { type: String, default: null },
        feedback: { type: String, default: null }
    },
    food_intake: [{
        time: { type: String },
        type: { type: String },
        meal_name: { type: String },
        cal: { type: Number },
        taste: { type: Number, enum: [0,1,2,3,4,5,6,7,8,9,10] }
    }],
    exercise_done: [{
        time: { type: String },
        type: { type: String },
        exercise_name: { type: String },
        cal_burnt: { type: Number },
        feeling_after_exercise: { type: String, enum: ["Exhausted", "Fresh"] }
    }]
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
