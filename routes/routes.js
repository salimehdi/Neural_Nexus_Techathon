import express, { Router } from "express";
import { updateUser, checkUser ,getUserByEmail } from "../controller/userController.js";
import { createBlog, deleteBlog, getAllBlogs } from "../controller/blogController.js";
import { updateExercise, updateFood, getAllNotification, getAllHistory } from "../controller/notificationController.js";
import { getUserHistory } from "../controller/historyController.js";

const router = Router();

// User Routes
router.put('/updateUser/:userId', updateUser);
router.post('/checkUser', checkUser);

// Blog Routes
router.post('/createBlog', createBlog);
router.delete('/deleteBlog/:blogId', deleteBlog);
router.get('/getAllBlogs', getAllBlogs);

// Exercise & Food Routes
router.put('/updateExercise/:userId', updateExercise);
router.put('/updateFood/:userId', updateFood);

// History & Notification Routes
router.get("/history/:userId", getUserHistory);
router.get("/notifications", getAllNotification); // Fetch all notifications
router.get("/history", getAllHistory); // Fetch all history records
// router.get('/getUserByEmail/:email', getUserByEmail);

export default router;
