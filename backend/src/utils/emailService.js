import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async function (options) {
  const mailGenerator = new Mailgen({
    theme: "dark",
    product: {
      name: "CollabBoard",
      link: "http://localhost:5173",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.collabboard@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed silently! Please make sure you have provided your mailtrap credentials in the .env file",
      error,
    );
  }
};

const forgotPasswordMailgenContent = (userName, passwordResetUrl) => {
  return {
    body: {
      name: userName,
      intro: "We got a request to reset the password of your account.",
      action: {
        instructions: "To reset your password, click on the button below.",
        button: {
          color: "#c23131",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Simply reply to this email, we'll be happy to help you.",
    },
  };
};

export { sendEmail, forgotPasswordMailgenContent };
