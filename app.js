const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// App Config
const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// DB Connection
mongoose.connect(process.env.MONGO_URI).then((x) => {
  console.log(
    `Connected to the database Database name: "${x.connections[0].name}"`
  );
});

// Routes
// Authentification routes
const authRouter = require("./routes/authRoutes");
app.use("/auth", authRouter);

// User routes
const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

// Workout routes
const workoutRouter = require("./routes/workout.routes");
app.use("/api", workoutRouter);

// Progress routes
const progressRouter = require("./routes/progress.routes");
app.use("/api", progressRouter);

// Exercises routes
const exercisesRouter = require("./routes/exercises.routes");
app.use("/api", exercisesRouter);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
