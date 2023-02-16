const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EmailSend,
    pass: process.env.PASSWORD,
  },
});
module.exports.sendConfirmationEmail = (email, content, subjectEmail) => {
  transport
    .sendMail({
      from: process.env.EmailSend,
      to: email,
      subject: subjectEmail,
      html: content,
    })
    .catch((err) => {
      console.error("🚀 ~ file: mailer.js:24 ~ err", err);
    });
};
