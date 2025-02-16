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
                time: updateFields.sleeping.time || null,
                schedule: updateFields.sleeping.schedule || null,
                feedback: updateFields.sleeping.feedback || null
            };
        }

        if (updateFields.food_intake) {
            updateFields.food_intake = updateFields.food_intake.map(meal => ({
                time: meal.time || null,
                type: meal.type || null,
                meal_name: meal.meal_name || null,
                cal: meal.cal || null,
                taste: meal.taste || null
            }));
        }

        if (updateFields.exercise_done) {
            updateFields.exercise_done = updateFields.exercise_done.map(exercise => ({
                time: exercise.time || null,
                type: exercise.type || null,
                exercise_name: exercise.exercise_name || null,
                cal_burnt: exercise.cal_burnt || null,
                feeling_after_exercise: exercise.feeling_after_exercise || null
            }));
        }

        if (updateFields.dietary_preferences && !["Non-Veg", "Veg", "Jain"].includes(updateFields.dietary_preferences)) {
            return res.status(400).json({ message: "Invalid dietary preference. Choose from Non-Veg, Veg, or Jain." });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
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
            const randomTargets = ["Hard Gain", "Gain", "Maintain", "Loss", "Hard Loss"];
            const randomMeals = [1, 2, 3, 4];
            const randomAllergies = [null, "Peanuts", "Dairy", "Gluten", "Soy", "Shellfish"];
            const randomSleepDuration = ["6 hours", "7 hours", "8 hours", "9 hours"];
            const randomSleepSchedule = ["Consistent", "Irregular", "Moderate"];
            const randomSleepQuality = ["Excellent", "Good", "Average", "Poor"];

            user = new UserModel({
                name: null,
                email: email,
                profilePic: null,
                age: null,
                gender: null,
                height: null,
                weight: null,
                bmi: null,
                activityLevel: null,
                target: randomTargets[Math.floor(Math.random() * randomTargets.length)],
                mealsPerDay: randomMeals[Math.floor(Math.random() * randomMeals.length)],
                dietary_preferences: ["Veg", "Non-Veg", "Vegan"][Math.floor(Math.random() * 3)],
                allergies: randomAllergies[Math.floor(Math.random() * randomAllergies.length)],
                sleeping: { 
                    time: randomSleepDuration[Math.floor(Math.random() * randomSleepDuration.length)],
                    schedule: randomSleepSchedule[Math.floor(Math.random() * randomSleepSchedule.length)],
                    feedback: randomSleepQuality[Math.floor(Math.random() * randomSleepQuality.length)]
                },
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


const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;

        // Find user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export { getUserByEmail };


export { updateUser, checkUser };
