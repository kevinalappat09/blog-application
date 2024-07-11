const Blog = require("../models/Blog");

exports.listBlogs =  async(req,res) => {
    try {
        const result = await Blog.find({});
        if(!result) {
            return res.status(404).json({message:"Blog not found"});
        }
        res.status(200).json(result);
    } catch(err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
};

exports.listAuthorBlogs = async (req,res) => {
    try {
        const authorId = req.params.author_id;
        if(!authorId) {
            return res.status(404).json({mesage:"Author id not provided"});
        }
        const result = await Blog.find({author:authorId});
        if(!result) {
            return res.status(404).json({message:"Author does not have blogs"});
        }
        res.status(200).json(result);
    } catch(err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
};

exports.returnBlog = async (req,res) => {
    try {
        const blogId = req.params.blog_id;
        if(!blogId) {
            return res.status(404).json({message:"Blog id not provided"});
        } 
        const result = await Blog.findById(blogId);
        if(!result) {
            return res.status(404).json({message:"Blog not found"});
        }
        res.status(200).json(result);
    } catch(err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
};

exports.addBlog = async (req,res) => {
    console.log("Unimplemented")
};

exports.deleteBlog = (req,res) => {
    console.log("Deletes a blog not implemented blogController:18");
};

exports.updateBlog = (req,res) => {
    console.log("Update blog not implemented blogController:22")
}