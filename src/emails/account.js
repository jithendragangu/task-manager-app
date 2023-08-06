const nodemailer = require('nodemailer');

function createTransporter(service, username, password) {
  return nodemailer.createTransport({
    service: service,
    auth: {
      user: username,
      pass: password,
    },
  });
}

async function sendEmail(recipient, name) {
  const transporter = createTransporter(
    'gmail',
    'kollati.pavankumar143@gmail.com',
    'nzoknkststuqayaa'
  );

  const mailOptions = {
    from: 'kollati.pavankumar143@gmail.com',
    to: recipient,
    subject: `Thanks for joining in! ${name}`,
    text: `Welcome to the app ${name} , Let me know how to get along with the app`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log(error);
  }
}

async function cancelEmail(recipient, name) {
  const transporter = createTransporter(
    'gmail',
    'kollati.pavankumar143@gmail.com',
    'nzoknkststuqayaa'
  );

  const mailOptions = {
    from: 'kollati.pavankumar143@gmail.com',
    to: recipient,
    subject: 'Thanks for going out!',
    text: `good bye ${name} , Let me know how to get along with the app`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendEmail,
  cancelEmail,
};
