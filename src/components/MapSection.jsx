import React from "react";

export const MapSection = () => {
  return (
    <section className="py-10 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-2">Lagos</h2>
      <p className="text-center text-gray-500 text-sm mb-8">
        No 15 Francis Oremeji Street, Computer Village, Ikeja, Lagos
      </p>

      <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-md">
        <iframe
          title="ServiceIS Center Location — Lagos"
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3963.4178383002436!2d3.3379928746309298!3d6.594877993398884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sNo%2015%20Francis%20oremeji%20street%20computer%20village!5e0!3m2!1sen!2sng!4v1775666938077!5m2!1sen!2sng"
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
