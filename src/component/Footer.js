import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-6 mt-8 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center text-lg font-bold gap-2">
          <span className="text-4xl">🛋️</span> CouchPotatoes
            
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="#about"
              className="hover:text-yellow-300 transition-colors"
            >
              About Us
            </a>
            <a
              href="#privacy"
              className="hover:text-yellow-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#contact"
              className="hover:text-yellow-300 transition-colors"
            >
              Contact
            </a>
            <a href="#faq" className="hover:text-yellow-300 transition-colors">
              FAQ
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-xs border-t border-white/50 pt-4">
          <p>© 2025 MovieApp. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
