import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default function sendEmail(to: string, token: string) {
  const PORT_NUM = 3000;
  const msg = {
    to,
    from: "jooniorprogrammer@gmail.com",
    subject: "Verification code from Joon's Market",
    text: `Please click: http://localhost:${PORT_NUM}/api/users/confirm?token=${token} to verify`,
    html: `<p>Please click: <strong>http://localhost:${PORT_NUM}/api/users/confirm?payload=${token}</strong> to verify</p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log(msg);
    })
    .catch((error) => {
      console.error(error);
    });
}
