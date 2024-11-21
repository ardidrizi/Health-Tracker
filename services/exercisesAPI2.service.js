const axios = require("axios");

class ExercisesAPI2 {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.EXERCISE_API2_URL,
    });
    this.api.interceptors.request.use((config) => {
      config.headers = {
        "x-rapidapi-key": process.env.EXERCISE_API_KEY,
        "x-rapidapi-host": process.env.EXERCISE_API2_HOST,
      };
      // Enable this if you want to see the request in the console
      return config;
    });
  }

  getAllExercises = () => {
    return this.api.get("/search");
  };

  getExerciseById = (exerciseId) => {
    return this.api.get("/" + exerciseId);
  };
}

const exercisesAPI2 = new ExercisesAPI2();
module.exports = exercisesAPI2;
