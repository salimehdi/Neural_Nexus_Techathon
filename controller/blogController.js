import BlogModel from "../models/User/BlogModel.js";




const createBlog = async (req, res, next) => {
    try {
        const { text, name, tags } = req.body;

        if (!text || !name) {
            return res.status(400).json({ message: "Text and name are required" });
        }

        const newBlog = new BlogModel({
            text,
            name,
            tags: tags || []
        });

        await newBlog.save();
        res.status(201).json({ message: "Blog created successfully", blog: newBlog });

    } catch (error) {
        next(error);
    }
};




const deleteBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;

        const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
        
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });

    } catch (error) {
        next(error);
    }
};




const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await BlogModel.find().sort({ timestamp: -1 }); // Sort by latest blogs
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};



export { createBlog, deleteBlog, getAllBlogs };
