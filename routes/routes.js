import express, { Router } from "express";
import { updateUser, checkUser } from "../controller/userController.js";
import { createBlog, deleteBlog } from "../controller/blogController.js";

const router = Router();

// User Routes
router.put('/updateUser/:userId', updateUser);
router.post('/checkUser', checkUser);

// Blog Routes
router.post('/createBlog', createBlog);
router.delete('/deleteBlog/:blogId', deleteBlog);

export default router;
