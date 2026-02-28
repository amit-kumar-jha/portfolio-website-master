import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

/**
 * SubmitBtn — Premium gradient submit button with ripple/glow effect.
 */
export default function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="group flex items-center justify-center gap-2 h-[3rem] w-[10rem] bg-accent-gradient text-white rounded-full outline-none transition-all duration-300 focus:scale-105 hover:scale-105 hover:shadow-glow-lg active:scale-100 disabled:scale-100 disabled:opacity-60 font-medium"
      disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-80 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </>
      )}
    </button>
  );
}
