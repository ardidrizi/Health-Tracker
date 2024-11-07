# Health-Fitness Tracker API

## Overview

This is the backend API server for the Health-Fitness Tracker application. It provides endpoints for user authentication, workout tracking, nutrition logging, sleep tracking, and progress monitoring.

## Features

- **User Authentication**: Users can sign up, log in, and manage their accounts with encrypted passwords.
- **Track Workouts**: Users can log different types of workouts (e.g., running, cycling, strength training) with details like duration, calories burned, etc.
- **Track Progress**: Users can track progress over time with weight and measurements.
- **Admin Panel**: Optional, for an admin to manage the system (users, workouts, food data, etc.).

## Database Models

The following models are used in the system:

- **User Model**: Stores authentication data and basic user details.
- **Workout Model**: Stores workout-related data like type, duration, calories burned.
<!-- - **Nutrition Model**: Stores food logs with calories, macros, and meal information.
- **Sleep Model**: Stores daily sleep logs (duration, quality). -->
- **Progress Model**: Stores metrics like weight, body measurements, and progress photos.

## Installation

To install and run the Health-Fitness Tracker API server, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Health-Fitness_Tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Health-Fitness_Tracker
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables by creating a `.env` file in the root directory and adding the necessary configuration.
5. Run the database migrations:
   ```bash
   npm run migrate
   ```
6. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

The API provides the following endpoints:

- **User Authentication**

  - `POST /api/auth/signup`: Sign up a new user.
  - `POST /api/auth/login`: Log in an existing user.
  - `GET /api/auth/me`: Get the authenticated user's details.
  - - `Get /api/user/:userId` Get a single user
  - `Get /api/user/:userId/workouts` Get all workout of single user
  - `Get /api/user/:userId/workouts/:workoutId` Get single workout of single user

- **Workouts**

  - `POST /api/workouts`: Log a new workout.
  - `GET /api/workouts`: Get all workouts for the authenticated user.
  - `GET /api/workouts/:id`: Get a specific workout by ID.
  - `PUT /api/workouts/:id`: Update a workout by ID.
  - `DELETE /api/workouts/:id`: Delete a workout by ID.

- **Nutrition**

  - `POST /api/nutrition`: Log a new food entry.
  - `GET /api/nutrition`: Get all food entries for the authenticated user.
  - `GET /api/nutrition/:id`: Get a specific food entry by ID.
  - `PUT /api/nutrition/:id`: Update a food entry by ID.
  - `DELETE /api/nutrition/:id`: Delete a food entry by ID.

- **Sleep**

  - `POST /api/sleep`: Log a new sleep entry.
  - `GET /api/sleep`: Get all sleep entries for the authenticated user.
  - `GET /api/sleep/:id`: Get a specific sleep entry by ID.
  - `PUT /api/sleep/:id`: Update a sleep entry by ID.
  - `DELETE /api/sleep/:id`: Delete a sleep entry by ID.

- **Progress**
  - `POST /api/progress`: Log a new progress entry.
  - `GET /api/progress`: Get all progress entries for the authenticated user.
  - `GET /api/progress/:id`: Get a specific progress entry by ID.
  - `PUT /api/progress/:id`: Update a progress entry by ID.
  - `DELETE /api/progress/:id`: Delete a progress entry by ID.

## Contributing

We welcome contributions to the Health-Fitness Tracker API project. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of your changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<!-- ## Contact
For any questions or suggestions, please contact us at
