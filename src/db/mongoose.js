const mongoose = require('mongoose');
// const validator = require('validator');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// const Task = mongoose.model(
//   'Task',
//   new mongoose.Schema({
//     description: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     completed: {
//       type: Boolean,
//       default: false,
//     },
//   })
// );

// const Task1 = new Task({
//   description: '        Stay Strong  ',
// });

// Task1.save()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const User = mongoose.model(
//   'User',
//   new mongoose.Schema({
//     name: { type: String, required: true, trim: true },
//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       validate(value) {
//         if (!validator.isEmail(value)) {
//           throw new Error('Email is invalid');
//         }
//       },
//     },
//     password: {
//       type: String,
//       trim: true,
//       minlength: 7,
//       required: true,
//       validate(value) {
//         if (value.toLowerCase().includes('password')) {
//           throw new Error('password must not contain password word ');
//         }
//       },
//     },
//     age: {
//       type: Number,
//       default: 0,
//       validate(value) {
//         if (value < 0) {
//           throw new Error('Age must be positive number');
//         }
//       },
//     },
//   })
// );

// const me = new User({
//   name: '   jittu  ',
//   password: 'jitha',
//   email: 'JIthendra@gmail.com    ',
// });

// // me.save()
// //   .then((data) => {
// //     console.log(data);
// //     // console.log(me);
// //   })
// //   .catch((error) => {
// //     console.log('Error!', error);
// //   });
