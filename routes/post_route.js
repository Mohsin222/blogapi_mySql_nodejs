

const router = require("express").Router();
const {    getPosts,  getSinglePost,  addPost,  deletePost,  updatePost,}= require('../controller/post_controller')
router.get("/singlPost/:id",getSinglePost );
router.get("/", getPosts);

// router.post("/:id", );
router.post("/", addPost);
router.delete("/:id",deletePost );
router.put("/:id", updatePost);


module.exports = router;