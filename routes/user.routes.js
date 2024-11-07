const express = require("express");
const User = require("../models/User.model");
const Workout = require("../models/Workout.model");
const userRouter = express.Router();
const { verifyJWT } = require("../middleware/verifyJWT");

// GET /api/auth/me
userRouter.get("/auth/me", verifyJWT, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload && req.payload.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ error: "server error" });
  }
});

// GET /api/user/:userId
userRouter.get("/user/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

// GET /api/user/:userId/workouts
userRouter.get("/user/:userId/workouts", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const workouts = await Workout.find({ user: userId });
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

// GET /api/user/:userId/workouts/:workoutId
userRouter.get("/user/:userId/workouts/:workoutId", async (req, res, next) => {
  const { userId, workoutId } = req.params;

  try {
    const workout = await Workout.findOne({ _id: workoutId, user: userId });
    res.status(200).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = userRouter;
