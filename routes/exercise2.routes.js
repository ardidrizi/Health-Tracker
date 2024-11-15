const express = require("express");
const exercisesAPI2 = require("../services/exercisesAPI2.service");
const { verifyJWT } = require("../middleware/verifyJWT");
const exercisesRouter2 = express.Router();

exercisesRouter2.get("/exer", verifyJWT, async (req, res, next) => {
  try {
    const response = await exercisesAPI2.getAllExercises();
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

exercisesRouter2.get(
  "/exercises/:exerciseId",
  verifyJWT,
  async (req, res, next) => {
    const { exerciseId } = req.params;
    try {
      const response = await exercisesAPI2.getExerciseById(exerciseId);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
);

module.exports = exercisesRouter2;
