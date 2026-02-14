import React from 'react';
import { Link } from 'react-router-dom';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from 'react-icons/io5';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-display font-bold mb-4">
              🥭 Mango OMS
            </h3>
            <p className="text-sm mb-4">
              Premium quality mangoes delivered fresh from our farms to your doorstep.
              Experience the sweetest varieties in convenient carton lots.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <IoLogoFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <IoLogoTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <IoLogoInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <IoLogoLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm hover:text-primary-500 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-primary-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-sm hover:text-primary-500 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm hover:text-primary-500 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-primary-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <IoLocationOutline className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Mango Farm Road, Agricultural District, City 12345</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <IoCallOutline className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary-500 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <IoMailOutline className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@mangooms.com" className="hover:text-primary-500 transition-colors">
                  info@mangooms.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-center md:text-left">
            © {currentYear} Mango OMS. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="hover:text-primary-500 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary-500 transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-primary-500 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;