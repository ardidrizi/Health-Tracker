const express = require("express");
const Favorite = require("../models/Favorites.model");
const { verifyJWT } = require("../middleware/verifyJWT");
const User = require("../models/User.model");

const favoriteRouter = express.Router();

// Post a favorite workout
favoriteRouter.post("/favorite", verifyJWT, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const foundUser = await User.findById(_id);
    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { workoutId } = req.body;
    if (!workoutId) {
      res.status(400).json({ message: "Workout id is required" });
      return;
    }

    // check if the user already have a record in the fav/
    // check if the found record of the favorite already includes the workoutId
    const foundFavoriteByUserId = await Favorite.findOne({
      user: _id,
    });

    if (!foundFavoriteByUserId) {
      const createdWorkout = await Favorite.create({
        user: _id,
        workouts: [workoutId],
      });
      res.status(201).json(createdWorkout);
      return;
    }

    const foundWorkoutInFavorites = foundFavoriteByUserId.workouts.find(
      (id) => id === workoutId
    );
    if (foundWorkoutInFavorites) {
      res.status(400).json({ message: "Workout already favorited" });
      return;
    }

    const updatedFavorite = await Favorite.findByIdAndUpdate(
      foundFavoriteByUserId._id,
      { $push: { workouts: workoutId } },
      { new: true }
    );
    res.status(201).json(updatedFavorite);
  } catch (error) {
    console.warn(error);
    next(error);
  }
});

// Update a favorite workout
favoriteRouter.patch(
  "/favorite/:favoriteId",
  verifyJWT,
  async (req, res, next) => {
    const { favoriteId } = req.params;
    const { workoutId } = req.body;

    if (!workoutId) {
      res.status(400).json({ message: "Workout id is required" });
      return;
    }

    if (!favoriteId) {
      res.status(400).json({ message: "Favorite id is required" });
      return;
    }

    const foundFavorite = await Favorite.findById(favoriteId);
    const foundWorkoutInFavorites = foundFavorite.workouts.find(
      (id) => id === workoutId
    );

    if (!foundWorkoutInFavorites) {
      res.status(400).json({ message: "Workout does not exist" });
      return;
    }

    try {
      const updatedFavorite = await Favorite.findByIdAndUpdate(
        favoriteId,
        { $pull: { workouts: workoutId } },
        { new: true }
      );
      res.status(201).json(updatedFavorite);
    } catch (error) {
      console.warn(error);
      next(error);
    }
  }
);

// Get all favorite workouts by current userid
favoriteRouter.get("/favorite", verifyJWT, async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const foundUser = await User.findById(_id);
    if (!foundUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const foundFavorite = await Favorite.findOne({ user: _id });
    if (!foundFavorite) {
      res.status(404).json({ message: "Favorite not found" });
      return;
    }

    res.status(200).json(foundFavorite);
  } catch (error) {
    console.warn(error);
    next(error);
  }
});

module.exports = favoriteRouter;
