const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
const sharp = require('sharp');
const multer = require('multer');
const { cancelEmail, sendEmail } = require('../emails/account');

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('please upload the image format...'));
    }
    cb(undefined, true);
  },
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }

  // user
  //   .save()
  //   .then((data) => {
  //     res.status(201).send(data);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    //res.send({ user: user.getPublicProfile(), token });
    //instead of the above statement we use the toJSON method
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (e) {
  //   res.status(500).send(e);
  // }

  // User.find({})
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

// router.get('/users/:id', async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res
//         .status(404)
//         .send({ error: `user not found for given id ${_id}` });
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
//   // User.findById(_id)
//   //   .then((user) => {
//   //     if (!user) {
//   //       return res
//   //         .status(404)
//   //         .send({ error: `user not found for given id ${_id}` });
//   //     }

//   //     res.send(user);
//   //   })
//   //   .catch((error) => {
//   //     res.status(500).send(error);
//   //   });
// });

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid update !' });
  }
  try {
    // if (!user) {
    //   return res
    //     .status(404)
    //     .send(`user not found for given id ${req.params.id}`);
    // }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    // user.validate();
    await req.user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res
    //     .status(404)
    //     .send({ error: `user not found for given id ${req.params.id}` });
    // }

    await req.user.remove();
    cancelEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});
module.exports = router;
