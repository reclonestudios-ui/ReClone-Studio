import React from 'react';
import { FaDiscord, FaYoutube, FaMailchimp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white py-10 px-4 font-sans relative z-10">
      <div className="absolute inset-0 bg-black -z-10"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="font-audiowide text-2xl md:text-3xl text-white mb-2">Reclone Studios</h3>
            <p className="text-gray-300 text-sm">Creating immersive gaming experiences</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://discord.gg/example" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-blue-600 transition-colors duration-300 text-xl"
              aria-label="Discord"
            >
              <FaDiscord className="w-6 h-6" />
            </a>
            <a 
              href="https://youtube.com/example" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-red-600 transition-colors duration-300 text-xl"
              aria-label="YouTube"
            >
              <FaYoutube className="w-6 h-6" />
            </a>
            {/* <a 
              href="https://twitter.com/example" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-white transition-colors duration-300 text-xl"
              aria-label="E-Mail"
            >
              <FaMailchimp className="w-6 h-6" />
            </a> */}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Reclone Studios. All rights reserved.
          </p>
          {/* <div className="mt-2 flex justify-center space-x-4 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
