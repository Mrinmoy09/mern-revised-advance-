const asyncHandler = require('express-async-handler');

// @desc Get Goals
// @route GET /api/goals
// @acsess private

const getGoals =asyncHandler( async (req,res) => {
    res.status(200).json({message: 'Get goals'});
})

// @desc Post Goals
// @route POST /api/goals
// @acsess private

const setGoals =asyncHandler( async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field');
    }
    res.status(200).json({message: 'Set goals'});
})

// @desc update Goal
// @route PUT /api/goals/:id
// @acsess private

const updateGoals = asyncHandler( async (req,res) => {
    res.status(200).json({message: `Update goals ${req.params.id}`});
})
// @desc delete Goal
// @route DELETE /api/goals/:id
// @acsess private

const deleteGoals = asyncHandler( async (req,res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`});
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}