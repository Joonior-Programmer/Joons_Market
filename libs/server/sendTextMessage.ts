import twilio from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken, {
  lazyLoading: true,
});

export default function sendTextMessage(to: string, token: string) {
  client.messages.create({
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID!,
    to,
    body: `Your Verification code is ${token}.`,
  });
  // .then(message => console.log(message.sid)).catch((error) => console.log(error));
}
