const express = require('express')
const router = express.Router()
const Student = require('../models/student')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')



//REGISTER
router.post("/register-student", async (req, res) => {
    const newStudent = new Student({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      contact: req.body.contact,
      subject: req.body.subject,
      grades: req.body.grades,
      img: req.body.img,
      location: req.body.location,
      password: CryptoJS.AES.encrypt(
      req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
      const savedStudent = await newStudent.save();
      res.status(201).json(savedStudent);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //LOGIN
  
  router.post('/login-student', async (req, res) => {
    
      try{
        
          const student = await Student.findOne(
              {
                  username: req.body.username
              }
          );
  
          !student && res.status(401).json("Wrong User Name");
          console.log(student)
          const hashedPassword = CryptoJS.AES.decrypt(
              student.password,
              process.env.PASS_SEC
          );
          
          console.log(hashedPassword)
  
          const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  
          const inputPassword = req.body.password;
          console.log("Hey there..")
          originalPassword != inputPassword && 
              res.status(401).json("Wrong Password");
  
          const accessToken = jwt.sign(
          {
              id:student._id,
          },
          process.env.JWT_SEC,
              {expiresIn:"3d"}
          );
    
          const { password, ...others } = student._doc;  
          res.status(200).json({...others, accessToken});
  
      }catch(err){
          res.status(500).json(err);
      }
  
  });
  
  module.exports = router;