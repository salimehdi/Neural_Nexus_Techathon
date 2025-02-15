import UserModel from "../models/User/UserModel.js";
import mongoose from "mongoose";


const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updateFields = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        if (updateFields.sleeping) {
            updateFields.sleeping = {
                time: updateFields.sleeping.time,
                schedule: updateFields.sleeping.schedule,
                feedback: updateFields.sleeping.feedback
            };
        }

        if (updateFields.food_intake) {
            updateFields.food_intake = updateFields.food_intake.map(meal => ({
                time: meal.time,
                type: meal.type,
                meal_name: meal.meal_name,
                cal: meal.cal,
                taste: meal.taste
            }));
        }

        if (updateFields.exercise_done) {
            updateFields.exercise_done = updateFields.exercise_done.map(exercise => ({
                time: exercise.time,
                type: exercise.type,
                exercise_name: exercise.exercise_name,
                cal_burnt: exercise.cal_burnt,
                feeling_after_exercise: exercise.feeling_after_exercise
            }));
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            new mongoose.Types.ObjectId(userId),  // ✅ Convert userId to ObjectId
            updateFields,
            { new: true, runValidators: true }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const checkUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        let user = await UserModel.findOne({ email });

        if (!user) {
            // Create a new user with default values
            user = new UserModel({
                name: null,
                email: email,
                profilePic: null,
                age: null, // Default age
                gender: null,
                height: null, // Default height in cm
                weight: null, // Default weight in kg
                activityLevel: null,
                target: null,
                mealsPerDay: null,
                allergies: null,
                sleeping: { time: null, schedule: null, feedback: null },
                food_intake: [],
                exercise_done: []
            });

            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};



export { updateUser, checkUser };
