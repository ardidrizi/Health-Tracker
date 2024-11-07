const { Schema, model } = require("mongoose");

const progressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
  date: {
    type: Date,
    default: Date.now,
  },
});

const Progress = model("Progress", progressSchema);

module.exports = Progress;
