import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToAbout = () => {
    if (window.location.pathname !== '/') {
      navigate('/#about');
    } else {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-500 border-t border-gray-200 py-12 mt-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <img src="./vizuyerlogo.png" alt="" srcset="" className="w-30 h-10 mb-6 rounded-[50px] mx-auto"></img>
        <h3 className="text-xl font-bold text-white mb-6"></h3>
        <p className="text-gray-500 mb-8 font-medium text-white">Visual Confidence for Online Shopping</p>

        
        <div className="flex items-center justify-center gap-50 mb-8 text-sm font-medium text-gray-600 border-b border-gray-300 pb-8">
          <button 
            onClick={scrollToAbout}
            className="hover:text-black transition-colors text-gray-300 cursor-pointer"
          >
            About
          </button>
          <span className="text-gray-300">·</span>
          <button 
            onClick={() => navigate('/')}
            className="hover:text-black transition-colors text-gray-300 cursor-pointer"
          >
            Product
          </button>
          <span className="text-gray-300">·</span>
          <button 
            className="hover:text-black transition-colors cursor-pointer text-gray-300"
          >
            Feedback
          </button>
        </div>

       
        <p className="text-gray-200 text-sm">
          Built with clarity, interaction, and user-first thinking.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
