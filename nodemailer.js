const nodemailer = require("nodemailer");

// Create a transporter for sending emails
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "rayen.hamdi@sesame.com.tn",
    pass: "rh7rh7rh",
  },
});

module.exports.sendConfirmationEmail = (email, activationCode) => {
  if (!email) {
    console.log("Error: No recipient email address provided");
    return;
  }

  const mailOptions = {
    from: "rayen.hamdi@sesame.com.tn",
    to: email,
    subject: "Test Email",
    html: `
    <div>
    <h1>Activation du compte </h1>
      <h2>Bonjour </h2>
      <p>Veuillez confirmer votre email en cliquant sur le lien suivant
</p>
      <a href=http://localhost:3000/confirm>Cliquez ici
</a>
<ul>
<li> votre nom d'utilisateur   </li>
<li> votre mot de passe   </li>
</ul>
      </div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
