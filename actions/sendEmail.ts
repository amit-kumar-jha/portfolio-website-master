"use server";

import { Resend } from "resend";

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!senderEmail || typeof senderEmail !== "string") {
    return { error: "Invalid email address." };
  }

  if (!message || typeof message !== "string") {
    return { error: "Invalid message." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is missing in environment variables.");
    return {
      error:
        "Email service is currently offline. Please email directly at amitjha167@gmail.com",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const response = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "amitjha167@gmail.com",
      subject: `Portfolio Contact from ${senderEmail}`,
      replyTo: senderEmail,
      text: `From: ${senderEmail}\n\n${message}`,
    });

    if (response.error) {
      console.error("Resend API error:", response.error);
      return { error: response.error.message || "Failed to send email." };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("Server error sending email:", err);
    return {
      error: "Failed to send email. Please email directly at amitjha167@gmail.com",
    };
  }
};
