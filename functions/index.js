const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors");

admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const transporter = nodemailer.createTransport({
  service: "gmail.com",
  auth: {
    user: "your gmail address",
    pass: "app password from gmail=",
  },
});

exports.sendEmail = functions.https.onRequest((request, response) => {
  console.log(request.headers)
  cors({
    origin: ["your", "website", "url"],
  })(request, response, () => {
    if (request.method.toLowerCase() === "post") {
      const destination = request.body.dest;
      const subject = request.body.subject;
      const name = request.body.name;
      const messageBody = request.body.messageBody;
      const emailToMe =
            `From: ${destination}\n\n
            Name: ${name}\n\n 
            Subject: \n\t${messageBody}`;
      console.log(emailToMe);
      const mailOptions = {
        from: destination, // User's email
        to: "your gmail address", // your email
        subject, // email subject
        html: emailToMe, // email content in HTML
      };
      return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return response.send({error: err.toString()});
        } else {
          return response.send({status: "email sent"});
        }
      });
    }
  });
});
