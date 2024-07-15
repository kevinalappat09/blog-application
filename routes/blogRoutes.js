const express = require("express");
const router = express.Router();

const blogController = require("../controllers/BlogController");
const commentController = require("../controllers/CommentController");

const AuthUtils = require("../utils/authUtils");

// GET - / gets all the blogs
router.get("/",AuthUtils.authenticateToken,  blogController.listBlogs);


// GET - /:author_id/ - gets all the blogs of a particular author
router.get("/:author_id",AuthUtils.authenticateToken,  blogController.listAuthorBlogs);

// GET - /:author_id/:id - gets a particular blog
router.get("/:author_id/:blog_id/admin",AuthUtils.authenticateToken, blogController.returnBlog);

// POST - / adds a new blog
router.post("/", AuthUtils.authenticateToken, blogController.addBlog);

// PUT - /:author_id/:id - update a blog
router.put("/:author_id/:blog_id", AuthUtils.authenticateToken, blogController.updateBlog);

// DELETE - /:author_id/:id - deletes a blog
router.delete("/:author_id/:blog_id", AuthUtils.authenticateToken, blogController.deleteBlog);

router.post("/:author_id/:blog_id/publish", AuthUtils.authenticateToken, blogController.publishBlog);

router.get("/:author_id", blogController.listPublished);

router.get("/:author_id/:blog_id", blogController.returnPublishedBlog);

// ! Comment routes.
// GET i /:author_id/:blog_id/comments - returns all the comments of a blog
router.get("/:author_id/:blog_id/comments", commentController.listComments);

// GET - /:author_id/:blog_id/comments/:comment_id
router.get("/:author_id/:blog_id/comments/:comment_id", AuthUtils.authenticateToken, commentController.returnComment);

// POST - /:author_id/:blog_id/comments/
router.post("/:author_id/:blog_id/comments/", commentController.addComment);

// DELETE - /:author_id/:blog_id/comments/:comment_id
router.delete("/:author_id/:blog_id/comments/:comment_id", AuthUtils.authenticateToken, commentController.deleteComment);

module.exports = router;
