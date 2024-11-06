const { Schema, model } = require("mongoose");

const workoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workoutType: {
    type: String,
    required: true,
    enum: ["running", "cycling", "strength", "yoga", "other"],
  },
  duration: {
    type: Number, // duration in minutes
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
