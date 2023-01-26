const userModel = require("../Models/userModel");
var jwt = require("jsonwebtoken");



const register = async function (req, res) {
try{
    
const {email,firstName,lastName,password}=req.body;

const userEmail=await userModel.findOne({email})
if(userEmail){
    return res.status(400).send({status:false,message:"User already exists"})
}
const user=await userModel.create({firstName,lastName,email,password})
if(user) return res.status(201).send({status:true,message:"User created successfully"})
else return res.status(400).send({status:false,message:"User creation failed"})

}catch(err){
    res.status(500).send({status:false,message:err.message})
}

};

const loginUser = async function (req, res) {
    try{

 const {email,password} = req.body
    const user=await userModel.findOne({email,password})

    if(!user)res.status(400).send({status:false,message: "Invalid username or password"})
    else{
      const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET_KEY) // should be kept in the env file
        res.status(200).send({status:true,message:"User logged in successfully",token:token,data:user})
    } 
    }catch(err){
    res.status(500).send({status:false,message:err.message})
}
};
const getUsers = async function (req, res) {
  try {

    const users = await userModel.find({_id:{$ne:req.user._id}});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};


module.exports = { register, loginUser, getUsers };
