const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { setUpDatabase, userOne, userOneId } = require('./fixtures/db');

beforeEach(setUpDatabase);

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Jithendra',
      email: 'jithendra231@gmail.com',
      password: 'jithendra231',
    })
    .expect(201);

  //assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assetions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Jithendra',
      email: 'jithendra231@gmail.com',
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe('jithendra231');
});

test('should login existing  user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  //assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: 'userOne.password',
    })
    .expect(400);
});

test('should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('should delete user profile', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('Should not delete user for unauthenticated user', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('should upload avatar image', async () => {
  const response = await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200);

  const user = await User.findById(userOneId);
  // expect({}).toBe({});
  // expect({}).toEqual({});
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'sunny',
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toBe('sunny');
});

test('should not update invlid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      nickname: 'sunny',
    })
    .expect(400);
});
