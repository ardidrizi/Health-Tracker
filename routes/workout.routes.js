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

// GET /api/workouts/:userId??
workoutRouter.get("/workouts/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const workouts = await Workout.find({ user: userId });
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ error: "server error" });
  }
});

// get a workout by ID
// GET /api/workouts/:id
workoutRouter.get("/workouts/:userID/:workoutID", async (req, res, next) => {
  const { userID, workoutID } = req.params;
  console.log(`Workout id : ${workoutID}`);
  console.log(`User id : ${userID}`);

  if (!workoutID) {
    console.log("Workout ID is missing in the request");
    res.status(400).json({ error: "Workout ID is required" });
    return;
  }
  try {
    const workout = await Workout.findById(workoutID);
    res.status(200).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

// Update a workout by for a user by userID
// PUT /api/workouts/:id
workoutRouter.patch("/workouts/:id", async (req, res, next) => {
  const { userId } = req.body;
  const { id } = req.params;
  console.log(userId);
  console.log("req.body", req.body);

  if (!userId) {
    console.log("User ID is missing in the request body");
    return res.status(400).json({ error: "User ID is required" });
  }

  console.log(`Updating workout with ID: ${id} for user: ${userId}`);

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      console.log(`Workout with ID: ${id} not found`);
      return res.status(404).json({ error: "Workout not found" });
    }

    if (workout.user.toString() !== userId) {
      console.log(`Unauthorized update attempt by user: ${userId}`);
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ error: "server error" });
  }
});

// DELETE /api/workouts/:workoutId
workoutRouter.delete("/workouts/:workoutId", async (req, res, next) => {
  const { workoutId } = req.params;
  console.log(`Deleting workout with ID: ${workoutId}`);

  // check if the workout ID is provided
  if (!workoutId) {
    console.log("Workout ID is missing in the request");
    res.status(400).json({ error: "Workout ID is required" });
    return;
  }

  try {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      console.log(`Workout with ID: ${workoutId} not found`);
      return res.status(404).json({ error: "Workout not found" });
    }

    await Workout.findByIdAndDelete(workoutId); // Delete the workout from the database

    res.status(204).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = workoutRouter;
