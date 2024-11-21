const express = require("express");
const exercisesAPI = require("../services/exercisesAPI.service");
const exercisesRouter = express.Router();

exercisesRouter.get("/exercises", async (req, res, next) => {
  try {
    const response = await exercisesAPI.getAllExercises();
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});
// exercisesRouter.get("/exercises/:exerciseID", async (req, res, next) => {
//   try {
//     const response = await exercisesAPI.getSingleExercise(
//       req.params.exerciseID
//     );
//     console.log(response);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "server error" });
//   }
// });

module.exports = exercisesRouter;
