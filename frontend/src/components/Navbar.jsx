import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    if (location.pathname !== '/') {
      navigate('/#about');
    } else {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out border ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-md border-white/20 py-2' 
          : 'bg-white/70 backdrop-blur-sm border-white/10 py-3'
      } rounded-full w-[95%] max-w-4xl px-6`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          
          
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:bg-gray-900 transition-colors">
              V
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Vizuyer
            </span>
          </div>

    
          <div className="flex items-center gap-3">
            <button 
              className="bg-gray-800 text-white px-14 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-all flex items-center gap-1.5 group hover:text-gray-800 cursor-pointer" 
              onClick={scrollToAbout}
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    </nav>  
  );
};

export default Navbar;
