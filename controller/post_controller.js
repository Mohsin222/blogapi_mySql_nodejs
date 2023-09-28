const db =require('../db')


const getPosts =async(req,res)=>{
try {
    var q =req.body.cat
?
"SELECT * FROM posts WHERE cat=?"
: "SELECT * FROM posts"

// var q="SELECT * FROM posts";

db.query(q,[req.body.cat],(err,data)=>{
    if(err) return res.status(400).json({success:false,error:err})

    if(data.length ===0) return res.status(400).json({success:false,error:"not found"})

    return res.status(200).json({success:true,data:data})
})
} catch (error) {
    if(error) return res.status(400).json({success:false,error:error.message})

}
}

 const getSinglePost = (req, res) => {
try {
    const q =
    // "SELECT posts.id, `username`, `title`, `desc`, p.img, u.img , `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
"SELECT * from posts WHERE uid=?"

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);


    
  });
} catch (error) {
    if(error) return res.status(400).json({success:false,error:error.message})
}
  };



const addPost =async(req,res)=>{

    try {
        var q =
        "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
  
      var values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        new Date(),
        // '1994-1-05  05:05:05',
        req.body.uid,     
        // userInfo.id,
        // 22,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err.message);
        return res.json("Post has been created.");
      })
  
    } catch (error) {
       return res.status(400).json({success:false,error:error.message})
    }
    
}



const deletePost =async(req,res)=>{
  const postId = req.params.id;
  const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

  db.query(q, [postId, req.body.uid], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post!");

    return res.json("Post has been deleted!");
  });
}
const updatePost =async(req,res)=>{
  const postId = req.params.id;
  const q =      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

  db.query(q, [...values, postId, req.body.uid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been updated.");
  });
}

module.exports ={
    getPosts,
   getSinglePost,

    addPost,
    deletePost,
    updatePost,

}