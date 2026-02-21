import { Resend } from "resend";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject, htmlContent) {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // Use Resend's default verified domain
      to,
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    throw error;
  }
}
