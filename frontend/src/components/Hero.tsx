import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-black via-blue-900 to-black text-white h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-4 px-6 max-w-xl">
        <h1 className="text-5xl font-bold tracking-wide uppercase">NASA Explorer</h1>
        <p className="text-lg text-blue-200">
          Exploring the cosmos, one API at a time.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-blue-500 hover:bg-blue-700 transition px-6 py-3 rounded-full text-white font-semibold shadow-lg"
        >
          Start Exploring
        </Link>
      </div>
    </section>
  );
};

export default Hero;