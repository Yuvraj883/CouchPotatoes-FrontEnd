import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center text-lg font-bold gap-2">
            <span className="text-yellow-500 w-6 h-6">🍿</span>
            <span>MovieApp</span>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#about" className="hover:text-yellow-500">
              About Us
            </a>
            <a href="#privacy" className="hover:text-yellow-500">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-yellow-500">
              Contact
            </a>
            <a href="#faq" className="hover:text-yellow-500">
              FAQ
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-xs">
          <p>© 2025 MovieApp. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
