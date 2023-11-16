const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { comparePassword, hashPassword } = require("../helpers/authHelper.js");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // validate  all data name , email, password,phone ,address;
    if (!name) { 
      return res.send({ error: " Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phone is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }

    //  check user exits or not
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      // }).save();
    });
    await newUser.save();

    res.status(201).send({
      success: true,
      message: "Registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};


// login  for login we use just email and password 

const loginController =async (req,res)=>{
  try{
    // destructure the email and password from the users
    const {email,password}=  req.body;
    //  validate name and password 
    if(!email||!password){
      return res.status(404).send(
        {
          success:false,
          message:"Invalid email and password"
        }
      )
    }
    //  check user exitsornot 
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).send({
        success:false,
        message:"Email not Registerd",
      })
    }

    //  match the  password
    const match = await comparePassword(password,user.password);
    if(!match){
      return res.status(200).send({
        success:true,
        message:"Invalid Password"
      })
    }

    // token 
    const token = await jwt.sign({_id:user.id},process.env.JWT_SECRET,{
      expiresIn:"7d",
    })

    res.status(200).send({
      success:true,
      message:"login Successfully",
      user:{
        _id:user._id,
         name :user.name,
         email:user.email,
         phone:user.phone,
         address:user.address

      }
      ,token
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error in Login",
      error
    })
  }
}
module.exports = { registerController ,loginController};



