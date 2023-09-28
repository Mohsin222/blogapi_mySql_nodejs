// import express from "express";
// import multer from "multer";
const express =require('express')
const multer =require('multer')

const authRoutes =require("./routes/auth_route")
const postsRoutes =require("./routes/post_route")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/upload/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage });


  app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });



  app.use("/api/auth", authRoutes);
  app.use("/api/post", postsRoutes);



  app.listen(8800, () => {
    console.log("Connected!");
  });