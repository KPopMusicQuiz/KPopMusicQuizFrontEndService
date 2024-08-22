import { Resend } from "resend";

import { TwitchResetPasswordEmail } from "@/emails/templates/twitch-reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: "kpopmusicquiz@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`
  });
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: "kpopmusicquiz@resend.dev",
    to: email,
    subject: "Confirm your email",
    react: TwitchResetPasswordEmail({ username: email, updatedDate: new Date() })
  });
}
