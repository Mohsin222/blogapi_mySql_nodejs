
const bcrypt =require('bcryptjs')
const db =require('../db')
const jwt = require("jsonwebtoken")


const register = (req,res)=>{
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err,data)=>{
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

          //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values = [req.body.username, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
          });
       
    })
}

const login =async (req,res)=>{
    const q ="SELECT * from users WHERE username =?"

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(400).json({success:false,error:err})

        if(data.length === 0){
            if(err) return res.status(404).json({success:false,error:'user not found'})
        }

  //Check password
  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    data[0].password
  );

  if (!isPasswordCorrect)
    return res.status(400).json("Wrong username or password!");

    const token =jwt.sign({id:data[0].id},"jwtkey")

        return res.status(200).json({success:true,token:token,data:data})
    })
}


const logout =async (req,res)=>{}

module.exports ={
    register,
    login,
    logout
}