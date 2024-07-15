const Blog = require("../models/Blog");

exports.listBlogs =  async(req,res) => {
    try {
        const result = await Blog.find({}).select("title subtitle author");
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
        const result = await Blog.find({author:authorId}).select("_id title subtitle author");
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
    const {
        title,
        subtitle,
        tags,
        blocks
    } = req.body;

    if(!title || !subtitle ||  !tags || !blocks) {
        return res.status(404).json({message:"Fields incorrect"});
    }
    try {
        const alreadyExists = await Blog.findOne({title:title, author:req.user.userId}).select("title");
        if(alreadyExists) {
            return res.status(400).json({message:"Blog with that title already exists"})
        }
        const newBlog = new Blog({
            title:title,
            subtitle:subtitle,
            author:req.user.userId,
            tags:tags,
            published_on : null,
            published_state:"unpublished",
            blocks:blocks
        });
        await newBlog.save();
        return res.status(200).json({message:"Blog added successfully"});
    } catch(err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
};

exports.deleteBlog = async (req,res) => {
    const blogId = req.params.blog_id;
    try {
        await Blog.findOneAndDelete({id:blogId});
        return res.status(200).json({message:"Blog deleted successfully"});
    } catch(err) {
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
};

exports.updateBlog = async (req,res) => {
    const {
        title,
        subtitle,
        tags,
        blocks
    } = req.body;
    if(!title || !subtitle ||  !tags || !blocks) {
        return res.status(404).json({message:"Fields incorrect"});
    }
    try {
        await Blog.findOneAndUpdate({id:req.params.blog_id},{
            title:title,
            subtitle:subtitle,
            tags:tags,
            blocks:blocks
        });
        return res.status(200).json({message:"Update success"});
    } catch(err) {
        console.error(err);
        res.status(500).json({message:"Server error"})
    }
}

exports.publishBlog = async (req,res) => {
    const blogToPublish = req.parms.blog_id;
    if(!blogToPublish) {
        return res.status(400).json({message:"Blog does not exist"});
    }
    if(blogToPublish.author!==req.user.userId) {
        return res.status(401).json({message:"Forbidden"});
    }
    try {
        await Blog.findOneAndUpdate(
            {
                _id:req.params.blog_id
            }, 
            {
                published_state:"published",
                published_on:new Date()
            }
        );
        return res.status(200).json({message:"Published"});
    } catch(err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
}

exports.listPublished = async (req,res) => {
    try {
        const result = await Blog.find({published_state:"published"});
        if(!result) {
            return res.status(400).json({mesage:"No blogs found"});
        }
        return res.status(200).json(result);
    } catch(err) {
        console.error(err);
        return res.status(500).json({message:"Sever error"});
    }
}


exports.returnPublishedBlog = async (req,res) => {
    const blogToReturn = req.params.blog_id;
    if(!blogToReturn) {
        return res.status(404).json({message:"Blog id not provided"});
    }
    try {
        const blog = await Blog.findById(blogToReturn);
        if(!blog) {
            return res.status(404).json({message : "Blog not found"});
        }
        return res.status(200).json(blog);
    } catch(err) {
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
}