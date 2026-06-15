import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async function (options) {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "CollabBoard",
      link: "http://localhost:5173", //TODO: change this to production site
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

const forgotPasswordMailgenContent = (fullName, passwordResetUrl) => {
  return {
    body: {
      name: fullName,
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

const boardInvitationMailgenContent = (fullName, adminName, projectTitle, boardInvitationUrl) => {
  return {
    body: {
      name: fullName,
      intro: `You have been invited by ${adminName} for the project named ${projectTitle}.`,
      action: {
        instructions: "Click the button below if you want to join this project",
        button: {
          color: "#35c730",
          text: "Join",
          link: boardInvitationUrl,
        },
      },
      outro:
        "Need help, or have questions? Simply reply to this email, we'll be happy to help you.",
    },
  };
}

export {
  sendEmail,
  forgotPasswordMailgenContent,
  boardInvitationMailgenContent,
};
