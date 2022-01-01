require("dotenv").config();
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendGridMail = async (
  toEmail: string,
  subject: string,
  textMessage: string
) => {
  const msg = {
    to: toEmail,
    from: process.env.FROM_EMAIL,
    subject: subject,
    text: textMessage,
    // html: '<strong>Easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg as any)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export { sendGridMail };
