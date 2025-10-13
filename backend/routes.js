const { Router } = require("express")
const router = Router()


const commentController = require("./controllers/commentController");
const postController = require("./controllers/postController");
const userController = require("./controllers/userController");
const passport = require("passport");


router.get("/post/:id/comments/all", commentController.getAllComments);
router.post("/post/:id/comments/new_comment", commentController.createComment);
router.get("/post/:id/comments/comment/:id", passport.authenticate("jwt", { session : false }), commentController.getCommentById);
router.delete("/posts/:id/comment/:id", passport.authenticate("jwt", { session : false }), commentController.deleteComment);



router.get("/posts/all", postController.getUserPosts);
router.get("/posts/new-post", passport.authenticate("jwt", {session : false}),  (req, res) => {res.status(200).send("New post form");});
router.post("/posts/new-post", passport.authenticate("jwt", { session : false}), postController.createPost);
router.get("/posts/:id", postController.getPostById);
router.put("/posts/:id", passport.authenticate("jwt", { session : false }), postController.updatePost);
router.delete("/posts/:id", passport.authenticate("jwt", { session : false }), postController.deletePost);



router.post("/login", passport.authenticate("local", { session : false }), userController.loginUser);
router.get("/user", passport.authenticate("jwt", { session : false }), userController.getUser);
router.put("/user", passport.authenticate("jwt", { session : false }), userController.updateUser);
router.delete("/user", passport.authenticate("jwt", { session : false }), userController.deleteUser);
router.post("/signup", userController.signupUser); // 👈 nueva ruta



module.exports = router;


