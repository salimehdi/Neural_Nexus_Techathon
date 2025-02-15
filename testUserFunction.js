import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User/UserModel.js"; // Adjust path if needed

dotenv.config();

async function testUserFunctions() {
    try {
        // ✅ Connect to MongoDB
        await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");

        // 📌 Step 1: Create a test user
        const newUser = new User({
            name: "John Doe",
            email: `testuser${Math.floor(Math.random() * 1000)}@example.com`, // Random email to avoid unique constraint
            profilePic: "https://example.com/profile.jpg",
            age: 25,
            gender: "Male",
            height: 175,
            weight: 70,
            activityLevel: "Moderate",
            target: "Maintain",
            mealsPerDay: 3,
            allergies: "Peanuts, Dairy",
            sleeping: {
                time: "11:00 PM",
                schedule: "Irregular",
                feedback: "Need better sleep",
            },
            food_intake: [
                { time: "8:00 AM", type: "Breakfast", meal_name: "Oatmeal", cal: 250, taste: 5 },
                { time: "1:00 PM", type: "Lunch", meal_name: "Grilled Chicken", cal: 500, taste: 10 },
            ],
            exercise_done: [
                { time: "6:00 PM", type: "Cardio", exercise_name: "Running", cal_burnt: 300, feeling_after_exercise: "Fresh" },
            ],
            role: "User"
        });

        const savedUser = await newUser.save();
        console.log("🎉 Test User Created:", savedUser);

        // 📌 Step 2: Retrieve the user by email
        const foundUser = await User.findOne({ email: savedUser.email });
        console.log("🔍 Retrieved User:", foundUser);

        // 📌 Step 3: Update user details
        const updatedUser = await User.findOneAndUpdate(
            { email: savedUser.email },
            { $set: { weight: 72, target: "Gain" } },
            { new: true }
        );
        console.log("🔄 Updated User:", updatedUser);

        // 📌 Step 4: Delete the user
        await User.deleteOne({ email: savedUser.email });
        console.log("🗑️ User Deleted");

        // ✅ Close MongoDB Connection
        mongoose.connection.close();
        console.log("✅ MongoDB Connection Closed");

    } catch (error) {
        console.error("❌ Error:", error);
        mongoose.connection.close();
    }
}

// Run the test function
testUserFunctions();
