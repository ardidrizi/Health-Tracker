const axios = require("axios");

class ExercisesAPI {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.EXERCISE_API_URL,
    });
    this.api.interceptors.request.use((config) => {
      config.headers = {
        "x-rapidapi-key": process.env.EXERCISE_API_KEY,
        "x-rapidapi-host": process.env.EXERCISE_API_HOST,
      };
      return config;
    });
  }
  getAllExercises = () => {
    return this.api.get("/exercises");
  };
  getSingleExercise = (exerciseID) => {
    return this.api.get(`/exercises/exercise/${exerciseID}`);
  };
}

const exercisesAPI = new ExercisesAPI();
module.exports = exercisesAPI;
