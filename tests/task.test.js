const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
  setUpDatabase,
  userOne,
  userOneId,
  taskOne,
  userTwo,
  userTwoId,
} = require('./fixtures/db');

beforeEach(setUpDatabase);

test('should create task for the user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'Stay Strong',
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test('should get the all task of user', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});

test('should not delete the unauthorized data', async () => {
  const response = await request(app)
    .delete(`/tasks${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
