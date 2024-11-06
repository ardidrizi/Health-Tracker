const { Schema, model } = require("mongoose");

const progressSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  weight: {
    type: Number, // in kilograms or pounds
    required: true,
  },
  bodyFatPercentage: {
    type: Number,
  },
  chest: {
    type: Number, // in cm or inches
  },
  waist: {
    type: Number,
  },
  hips: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Progress = model("Progress", progressSchema);

module.exports = Progress;
