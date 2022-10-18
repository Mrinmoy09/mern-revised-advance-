const asyncHandler = require('express-async-handler');
const { findByIdAndDelete } = require('../models/goalModel.js');

const Goal = require('../models/goalModel')
const User = require('../models/userModel')
// @desc Get Goals
// @route GET /api/goals
// @acsess private

const getGoals =asyncHandler( async (req,res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals);
})

// @desc Post Goals
// @route POST /api/goals
// @acsess private

const setGoals =asyncHandler( async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal);
})

// @desc update Goal
// @route PUT /api/goals/:id
// @acsess private

const updateGoals = asyncHandler( async (req,res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //check if the user is same
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })
    res.status(200).json(updatedGoal);
})
// @desc delete Goal
// @route DELETE /api/goals/:id
// @acsess private

const deleteGoals = asyncHandler( async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal is not found')
    }

    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //check if the user is same
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }


    goal.remove();
    res.status(200).json({id:req.params.id})
    
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}