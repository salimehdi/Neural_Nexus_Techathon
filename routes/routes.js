import express, { Router } from "express";
import { updateUser, checkUser } from "../controller/userController.js";
import { createBlog, deleteBlog } from "../controller/blogController.js";
import { getAllBlogs } from "../controller/blogController.js";
import { updateExercise, updateFood } from "../controller/notificationController.js";


const router = Router();

// User Routes
router.put('/updateUser/:userId', updateUser);
router.post('/checkUser', checkUser);

// Blog Routes
router.post('/createBlog', createBlog);
router.delete('/deleteBlog/:blogId', deleteBlog);

router.get('/getAllBlogs', getAllBlogs);

router.put('/updateExercise/:userId', updateExercise);
router.put('/updateFood/:userId', updateFood); 

export default router;
