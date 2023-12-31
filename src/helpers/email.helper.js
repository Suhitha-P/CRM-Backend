const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'lee.altenwerth33@ethereal.email',
      pass: 'hh9y8Sn8JsGpztDSDK'
  }
});

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      let result = await transporter.sendMail(info);

      console.log("Message sent: %s", result.messageId);

      // Preview only available when sending through an Ethereal account
      const previewUrl = nodemailer.getTestMessageUrl(result);
      console.log("Preview URL: %s", previewUrl);

      // Adding a delay (e.g., 1 second) to allow time for logging
      setTimeout(() => {
        resolve(result);
      }, 1000);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

const emailProcessor = ({ email, pin, type, verificationLink = "" }) => {
  let info = "";
  switch (type) {
    case "request-new-password":
      info = {
        from: '"CMR Company" <lee.altenwerth33@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Password rest Pin", // Subject line
        text:
          "Here is your password rest pin" +
          pin +
          " This pin will expires in 1day", // plain text body
        html: `<b>Hello </b>
      Here is your pin 
      <b>${pin} </b>
      This pin will expires in 1day
      <p></p>`, // html body
      };

      send(info);
      break;

    case "update-password-success":
      info = {
        from: '"CMR Company" <lee.altenwerth33@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Password updated", // Subject line
        text: "Your new password has been update", // plain text body
        html: `<b>Hello </b>
       
      <p>Your new password has been update</p>`, // html body
      };

      send(info);
      break;

    case "new-user-confirmation-required":
      info = {
        from: '"CMR Company" <lee.altenwerth33@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Please verify your new user", // Subject line
        text:
          "Please follow the link to very your account before you can login", // plain text body
        html: `<b>Hello </b>
        <p>Please follow the link to very your account before you can login</p>
        <p>${verificationLink}</P>
        `, // html body
      };

      send(info);
      break;

    default:
      break;
  }
};

module.exports = { emailProcessor };