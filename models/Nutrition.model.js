// TO DECIDE IF WE USE THIS MODEL OR NOT!!!
// const { Schema, model} = require('mongoose');

// const nutritionSchema = new Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   mealType: {
//     type: String,
//     required: true,
//     enum: ['breakfast', 'lunch', 'dinner', 'snack'],
//   },
//   foodItems: [
//     {
//       name: String,
//       quantity: Number, // in grams or serving size
//       calories: Number,
//       protein: Number,
//       carbs: Number,
//       fats: Number,
//     },
//   ],
//   totalCalories: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Nutrition = model('Nutrition', nutritionSchema);

// module.exports = Nutrition;
