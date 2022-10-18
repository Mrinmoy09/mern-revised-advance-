const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
// @desc Post Users
// @route POST /api/users
// @acsess Public
const registerUser =asyncHandler( async(req,res) => {
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all field')
    }
    //check if user exist
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new  Error('User already exist')
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const user = await User.create({
        name,
        email,
        password:hashPassword
    })
    if(user){
        res.status(200).json({
            _id: user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})
// @desc Authenticate a user
// @route POST /api/login
// @acsess Public
const loginUser =asyncHandler( async(req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})
// @desc get Users data
// @route GET /api/users
// @acsess Private
const getUser =asyncHandler( async(req,res) => {
    const {_id,name,email} = await User.findById(req.user.id)
    res.status(200).json({
        _id:_id,
        name:name,
        email:email
    })
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id } , process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports = {registerUser,loginUser,getUser}