"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

/**
 * Contact — Glowing interactive contact form with premium glass styling.
 * Animated border glow, floating labels simulated via placeholder styling.
 */

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,40rem)] text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <motion.p
        className="text-gray-600 dark:text-white/65 -mt-4 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Please contact me directly at{" "}
        <a
          className="font-medium gradient-text hover:underline"
          href="mailto:amitjha167@gmail.com"
        >
          amitjha167@gmail.com
        </a>{" "}
        or through this form.
      </motion.p>

      {/* Form with glowing glass card */}
      <motion.div
        className="glass rounded-2xl p-8 glow-border"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Subtle radial glow behind form */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-1/5 via-transparent to-accent-4/5 pointer-events-none" />

        <form
          className="relative flex flex-col gap-4"
          action={async (formData) => {
            const { data, error } = await sendEmail(formData);

            if (error) {
              toast.error(error);
              return;
            }

            toast.success("Email sent successfully!");
          }}
        >
          <input
            className="h-14 px-5 rounded-xl bg-white/80 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 focus:border-accent-2 dark:focus:border-accent-2 outline-none transition-all duration-300 focus:shadow-glow text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30"
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="Your email"
          />
          <textarea
            className="h-52 rounded-xl p-5 bg-white/80 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 focus:border-accent-2 dark:focus:border-accent-2 outline-none transition-all duration-300 focus:shadow-glow text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 resize-none"
            name="message"
            placeholder="Your message"
            required
            maxLength={5000}
          />
          <div className="flex justify-center mt-2">
            <SubmitBtn />
          </div>
        </form>
      </motion.div>
    </motion.section>
  );
}
