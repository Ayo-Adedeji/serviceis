import React from "react";

export const MapSection = () => {
  return (
    <section className="py-10 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">Ibadan</h2>

      <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-md">
        <iframe
          title="ServiceIS Center Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.1643089251484!2d3.9196226730445085!3d7.447066535801441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039ed6c06c54137%3A0xeca470353ad2982f!2s2%20Ore%20Ofe%20Street%2C%20Ibadan%20200132%2C%20Oyo!5e0!3m2!1sen!2sng!4v1762966640784!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};
