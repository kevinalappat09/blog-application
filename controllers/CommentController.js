const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

exports.listComments = async (req,res) => {
    const blogId = req.params.blog_id;
    if(!blogId) {
        return res.status(404).json({message:"Blog id not provided"});
    }
    try {
        const blog = await Blog.findById(blogId);
        if(!blog) {
            return res.status(404).json({message:"Blog does not exist"});
        }
        const comments = await Comment.find({blog:blogId});
        if(!comments) {
            return res.status(404).json({message:"No comments for this blog"});
        }
        return res.status(200).json(comments);
    } catch(err){
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
};

exports.returnComment = async (req,res) => {
    const blogId = req.params.blog_id;
    if(!blogId) {
        return res.status(404).json({message:"Blog id was not given"});
    }
    const commentId = req.params.comment_id;
    if(!commentId) {
        return res.status(404).json({message:"Comment id was not given"});
    }
    try {
        const comment = await Comment.findById(commentId);
        if(!comment) {
            return res.status(404).json({message:"Comment not found"});
        }
        return res.statuts(200).json(comment)
    } catch(err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
};

exports.addComment = async (req,res) => {
    const { user_display, user_email, content, blog } = req.body;
    if(!user_display || !user_email || !content || !blog) {
        return res.status(404).json({message:"Required information not provided"});
    }
    try {
        const newComment = new Comment({
            user_display:user_display,
            user_email : user_email,
            content : content,
            date_published : new Date(),
            blog : blog
        });
        await newComment.save();
        return res.status(200).json({message:"Comment added successfully"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }

}

exports.deleteComment = async (req,res) => {
    const commentId = req.params.comment_id;
    if(!commentId) {
        return res.status(404).json({message:"Comment Id not given"});
    }
    try {
        const result = await findByIdAndDelete(commentId);
        return res.status(200).json({message:"Deleted successfully"});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
} 