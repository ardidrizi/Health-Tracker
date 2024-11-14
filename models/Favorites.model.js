const express = require("express");
const { Schema, model } = require("mongoose");

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workouts: [
    {
      type: String,
    },
  ],
});

const Favorite = model("Favorite", favoriteSchema);
module.exports = Favorite;
