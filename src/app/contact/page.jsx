'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [color, setColor] = useState('purple');
  const [showContent, setShowContent] = useState(true);
  const text = 'Say Hello';

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
          setShowContent(true); // Show content after sending email
        },
        () => {
          setError(true);
        }
      );
  };

  const handleFocus = () => {
    setShowContent(false); // Hide content when textarea is focused
  };

  return (
    <motion.div
      className="h-full"
      initial={{ y: '-200vh' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* TEXT CONTAINER */}
        {showContent && ( // Show content if showContent is true
          <div className="h-1/3 lg:h-full lg:w-1/2 flex items-center justify-center text-6xl">
            <div>
              {text.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              😊
            </div>
          </div>
        )}
        {/* FORM CONTAINER */}
        <form
          onSubmit={sendEmail}
          ref={form}
          // className="h-1/2 lg:h-full lg:w-1/2 bg-red-50 rounded-xl text-xl flex flex-col gap-8 justify-center p-24"
          className="h-3/4 lg:h-full lg:w-1/2 bg-red-50 rounded-xl text-xl flex flex-col gap-8 justify-center p-6 lg:p-24"
        >
          <span>Dear Mihai,</span>
          <textarea
            required
            onFocus={handleFocus} // Call handleFocus when textarea is focused}
            rows={6}
            className="bg-transparent border-b-2 border-b-black outline-none resize-none p-5"
            name="user_message"
          />
          <span>My mail address is:</span>
          <input
            required
            name="user_email"
            type="text"
            className="bg-transparent border-b-2 border-b-black outline-none p-5"
          />
          <span>Regards</span>

          <button
            style={{
              backgroundColor: success
                ? 'green'
                : error
                ? 'red'
                : 'bg-purple-500',
            }}
            onClick={() => setColor('green')}
            className="bg-purple-500 rounded font-semibold text-white p-4"
          >
            Send
          </button>

          {success && (
            <span className="text-green-600 font-semibold">
              Your message has been sent successfully!
            </span>
          )}
          {error && (
            <span className="text-red-600 font-semibold">
              Something went wrong!
            </span>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default ContactPage;
