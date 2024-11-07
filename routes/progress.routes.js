const express = require("express");
const Progress = require("../models/Progress.model");
const { verifyJWT } = require("../middleware/verifyJWT");

const progressRouter = express.Router();

// - `POST /api/progress`: Log a new progress entry.
// - `GET /api/progress`: Get all progress entries for the authenticated user.
// - `GET /api/progress/:id`: Get a specific progress entry by ID.
// - `PUT /api/progress/:id`: Update a progress entry by ID.
// - `DELETE /api/progress/:id`: Delete a progress entry by ID.

// POST /api/progress
progressRouter.post("/progress", verifyJWT, async (req, res, next) => {
  const { userId, weight, bodyFatPercentage } = req.body;

  try {
    const newProgress = await Progress.create({
      userId,
      weight,
      bodyFatPercentage,
    });

    res.status(201).json({ data: newProgress });
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ error: "server error" });
  }
});

// GET /api/progress
progressRouter.get("/progress", verifyJWT, async (req, res, next) => {
  try {
    const allProgress = await Progress.find({ userId: req.payload.id });

    res.status(200).json({ data: allProgress });
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).json({ error: "server error" });
  }
});

// GET /api/progress/:progressId
progressRouter.get(
  "/progress/:progressId",
  verifyJWT,
  async (req, res, next) => {
    const { progressId } = req.params;

    try {
      const progress = await Progress.findOne({
        _id: progressId,
        userId: req.payload.id,
      });

      if (!progress) {
        return res.status(404).json({ error: "progress entry not found" });
      }

      res.status(200).json({ data: progress });
    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).json({ error: "server error" });
    }
  }
);

// PUT /api/progress/:progressId
progressRouter.put(
  "/progress/:progressId",
  verifyJWT,
  async (req, res, next) => {
    const { progressId } = req.params;
    const { weight, bodyFatPercentage } = req.body;

    try {
      const updatedProgress = await Progress.findOneAndUpdate(
        { _id: progressId, userId: req.payload.id },
        { weight, bodyFatPercentage },
        { new: true }
      );

      if (!updatedProgress) {
        return res.status(404).json({ error: "progress entry not found" });
      }

      res.status(200).json({ data: updatedProgress });
    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).json({ error: "server error" });
    }
  }
);

// DELETE /api/progress/:progressId
progressRouter.delete(
  "/progress/:progressId",
  verifyJWT,
  async (req, res, next) => {
    const { progressId } = req.params;

    try {
      const deletedProgress = await Progress.findOneAndDelete({
        _id: progressId,
      });

      if (!deletedProgress) {
        return res.status(404).json({ error: "progress entry not found" });
      }

      res.status(200).json({ data: deletedProgress });
    } catch (error) {
      console.error(error);
      next(error);
      res.status(500).json({ error: "server error" });
    }
  }
);

module.exports = progressRouter;
