import BlogModel from "../models/User/BlogModel.js";

/**
 * @desc Create a new blog post
 * @route POST /api/blog/create
 */
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

/**
 * @desc Delete a blog post
 * @route DELETE /api/blog/delete/:blogId
 */
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

export { createBlog, deleteBlog };
