const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');
const app = express();
const PORT = process.env.PORT || 3000;

// const multer = require('multer');
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error('please upload a doc'));
//     }

//     cb(undefined, true);
//     // cb(new Error('File must be a PDF'));
//     // cb(undefined, true);
//     // cb(undefined, false);
//   },
// });

// const errorMiddleware = (req, res, next) => {
//   throw new Error('From my middleware');
// };

// app.post(
//   '/upload',
//   upload.single('upload'),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

// app.use((req, res, next) => {
//   // console.log(req.method, req.path);
//   // next();

//   if(req.method ==='GET'){res.send('GET requests are disabled')}else{next()}
// });

// app.use((req,res,next)=>{
//   res.status(503).send('The server is in maintenance mode')
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// const router = express.Router();

// router.get('/test', (req, res) => {
//   res.send('This is from my other router');
// });
// app.use(router);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

// // const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//   const token = jwt.sign({ _id: '123' }, 'thisismycourse', {
//     expiresIn: '7d',
//   });
//   console.log(token);

//   const data = jwt.verify(token, 'thisismycourse');
//   console.log(data);
//   // const password = 'Red12345!';
//   // const hashPassword = await bcrypt.hash(password, 8);
//   // console.log(password);
//   // console.log(hashPassword);
//   // const isMatch = await bcrypt.compare(password, hashPassword);
//   // console.log(isMatch);
// };

// myFunction();

// const pet = {
//   name: 'pepsi',
// };

// pet.toJSON = function () {
//   // console.log(this);
//   return {};
// };

// console.log(JSON.stringify(pet));

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//   // const task = await Task.findById('64c8c3d9c84ee3376ce76541');
//   // await task.populate('owner').execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById('64c8c1f522a02e29ec86c949');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// };

// main();
