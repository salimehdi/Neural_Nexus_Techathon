import UserModel from "../models/User/UserModel.js";
import mongoose from "mongoose";

// ✅ Update Exercise
const updateExercise = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { cal_burnt, feeling_after_exercise, time, type, exercise_name } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { 
                $push: { 
                    exercise_done: { time, type, exercise_name, cal_burnt, feeling_after_exercise } 
                } 
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Exercise updated successfully", updatedUser });
    } catch (error) {
        next(error);
    }
};

// ✅ Update Food Intake (Uses userId now)
const updateFood = async (req, res, next) => {
    try {
        const { userId } = req.params; 
        const { cal, taste, type, time, meal_name } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Ensure type is valid
        const allowedTypes = ["Lunch", "Dinner", "Brunch", "Breakfast"];
        if (!allowedTypes.includes(type)) {
            return res.status(400).json({ message: "Invalid meal type" });
        }

        // Ensure taste is within range 1-10
        if (taste < 1 || taste > 10) {
            return res.status(400).json({ message: "Taste must be between 1 and 10" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { 
                $push: { 
                    food_intake: { time, type, meal_name, cal, taste } 
                } 
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Food intake updated successfully", updatedUser });
    } catch (error) {
        next(error);
    }
};

export { updateExercise, updateFood };
