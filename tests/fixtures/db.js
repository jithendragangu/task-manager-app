const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: 'Mike',
  email: 'mileexample@gmail.com',
  password: 'supersecret',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, 'thisismycourse'),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
  _id: userTwoId,
  name: 'Andrew',
  email: 'Andrewexample@gmail.com',
  password: 'supersecret.',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, 'thisismycourse'),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Stay Focus',
  completed: true,
  owner: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'procastinate',
  completed: false,
  owner: userOne._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'showoff',
  completed: false,
  owner: userTwo._id,
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOne,
  userOneId,
  setUpDatabase,
  userTwo,
  userTwoId,
  taskOne,
};
