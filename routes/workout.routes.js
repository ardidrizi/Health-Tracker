const express = require("express");
const Workout = require("../models/Workout.model");

const workoutRouter = express.Router();

// - `POST /api/workouts`: Log a new workout.
// - `GET /api/workouts`: Get all workouts for the authenticated user.
// - `GET /api/workouts/:id`: Get a specific workout by ID.
// - `PUT /api/workouts/:id`: Update a workout by ID.
// - `DELETE /api/workouts/:id`: Delete a workout by ID.

// POST  /api/workouts
workoutRouter.post("/workouts", async (req, res, next) => {
  try {
    const newWorkout = await Workout.create(req.body);
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ error: "server error" });
  }
});

// GET /api/workouts
workoutRouter.get("/workouts", async (req, res, next) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ error: "server error" });
  }
});

// GET /api/workouts/:userId?? or :id??

module.exports = workoutRouter;
