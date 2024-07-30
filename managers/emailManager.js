const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f8b08fd760fa15",
          pass: "94fcf037ad6da8"
        }
      });

    transport.sendMail({
        to: to,
        from: "info@expensetracker.com",
        text: text,
        html: html,
        subject: subject
    });
};

module.exports = emailManager;