import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const NewsBox = () => {
  const [state, handleSubmit] = useForm("mvgqkwle");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccessMessage(true);

      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [state.succeeded]);

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe To our NewsLetter.
      </p>

      {showSuccessMessage ? (
        <p className="text-center text-black font-medium my-6">
          Thank you for subscribing!
        </p>
      ) : (
        <form
          className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full sm:flex-1 outline-none"
            required
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <button
            type="submit"
            disabled={state.submitting}
            className="bg-black text-white text-xs px-10 py-4 cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsBox;
