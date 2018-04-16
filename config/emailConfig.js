const NodeMailer = require('nodemailer');
let emailData = require('./emailData');
let email = {};

email.transporter = NodeMailer.createTransport({
   service: 'Gmail',
   auth:
       {
       user: emailData.email,
       pass: emailData.password
       },
   },
   {
   from: emailData.email,
   headers: {
   }
});

module.exports = email;