import UserModel from "../models/User/UserModel.js";
import mongoose from "mongoose";

// ✅ Update Exercise
import NotificationModel from "../models/User/NotificationModel.js"; // Import Notification Model
import HistoryModel from "../models/User/HistoryModel.js";


const updateExercise = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { cal_burnt, feeling_after_exercise, time, type, exercise_name } = req.body;

        // Validate User ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Push new exercise entry into `exercise_done` array
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

        // ✅ Create a notification for the user
        const notificationText = `🎉 Congratulations! You have successfully completed ${exercise_name}. You were feeling ${feeling_after_exercise}.`;

        await NotificationModel.create({
            userId,
            exercise_name
        });

        // ✅ Push entry to HistoryModel
        await HistoryModel.create({
            userId,
            text: `🏋️ Exercise Completed: ${exercise_name}`
        });

        res.status(200).json({ 
            message: "Exercise updated successfully", 
            notification: notificationText, 
            updatedUser 
        });

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


// ✅ Get all notifications
const getAllNotification = async (req, res, next) => {
    try {
        const notifications = await NotificationModel.find().sort({ createdAt: -1 });

        if (!notifications.length) {
            return res.status(404).json({ message: "No notifications found." });
        }

        res.status(200).json({ notifications });
    } catch (error) {
        next(error);
    }
};

// ✅ Get all history records
const getAllHistory = async (req, res, next) => {
    try {
        const historyRecords = await HistoryModel.find().sort({ createdAt: -1 });

        if (!historyRecords.length) {
            return res.status(404).json({ message: "No history records found." });
        }

        res.status(200).json({ history: historyRecords });
    } catch (error) {
        next(error);
    }
};

export { getAllNotification, getAllHistory };


export { updateExercise, updateFood };
