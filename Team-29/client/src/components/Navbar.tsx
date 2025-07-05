import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface NavbarProps {
  navigationItems: { name: string; href: string }[];
  onLogout: () => void;
  userType?: 'admin' | 'user';
}

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: any;
      };
    };
    googleTranslateElementInit: () => void;
  }
}

const Navbar: React.FC<NavbarProps> = ({ navigationItems, onLogout, userType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!userType);
  const [userTypeState, setUserTypeState] = useState<string | null>(userType || null);
  const location = useLocation();

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const user = localStorage.getItem('userType');
    setIsLoggedIn(loginStatus === 'true');
    setUserTypeState(user);

    // Initialize Google Translate
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Define the callback function
    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,bn,te,ta,ml,gu,pa,or,as,mr,kn',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      }, 'google_translate_element');
    };

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const toggleTranslate = () => {
    const translateElement = document.getElementById('google_translate_element');
    if (translateElement) {
      const isVisible = translateElement.style.display === 'block';
      
      if (isVisible) {
        translateElement.style.display = 'none';
      } else {
        translateElement.style.display = 'block';
        translateElement.style.position = 'absolute';
        translateElement.style.top = '100%';
        translateElement.style.right = '0';
        translateElement.style.zIndex = '1000';
        translateElement.style.marginTop = '8px';
        translateElement.style.backgroundColor = 'white';
        translateElement.style.border = '1px solid #e5e7eb';
        translateElement.style.borderRadius = '8px';
        translateElement.style.padding = '8px';
        translateElement.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        
        // Try to trigger the dropdown
        const selectElement = translateElement.querySelector('select');
        if (selectElement) {
          selectElement.focus();
          selectElement.click();
        }
      }
    }
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-white/95 to-green-50/95 backdrop-blur-md border-b border-green-200/50 shadow-lg z-50">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <img 
                  src="https://cmlnortheast.com/wp-content/uploads/2018/05/CML-Logo-black-text-2.png" 
                  className="w-8 h-8 rounded-lg" 
                  alt="CML Logo"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">
                Centre for Microfinance
              </h1>
              <p className="text-sm font-medium text-green-600">& Livelihood (CML)</p>
            </div>
          </div>
          
          {/* User Info - Only show when logged in */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
                <div className="text-sm font-semibold text-green-700">
                  {userType === 'admin' ? '👨‍💼 Admin' : '👤 User'}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-all duration-200 rounded-lg hover:bg-green-50 relative group"
              >
                {item.name}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-200 group-hover:w-full"></div>
              </Link>
            ))}
            
            {/* Google Translate Element */}
            <div className="flex items-center ml-3 relative">
              <button 
                onClick={toggleTranslate}
                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                title="Change Language"
              >
                <Globe className="w-4 h-4" />
              </button>
              <div id="google_translate_element" className="hidden"></div>
            </div>
            
            {/* Login/Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="ml-4 flex items-center gap-2 px-4 py-2 text-green-700 hover:text-white bg-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 border border-green-200 hover:border-transparent rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-4 flex items-center gap-2 px-6 py-2 text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-green-700" />
            ) : (
              <Menu className="w-6 h-6 text-green-700" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav 
            className="lg:hidden mt-4 pb-4 border-t border-green-200/50 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-1 pt-4 px-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium py-3 px-4 rounded-lg hover:bg-green-50 transition-all duration-200 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Google Translate */}
              <div className="flex items-center py-2 px-3">
                <button 
                  onClick={() => {
                    // Trigger Google Translate dropdown
                    const translateElement = document.querySelector('#google_translate_element_mobile .goog-te-combo') as HTMLSelectElement;
                    if (translateElement) {
                      translateElement.click();
                    }
                  }}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 p-2"
                  title="Change Language"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">Language</span>
                </button>
                <div id="google_translate_element_mobile" className="hidden"></div>
              </div>
              
              {/* Mobile Login/Logout Button */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-green-700 hover:text-white bg-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 border border-green-200 hover:border-transparent py-3 px-4 rounded-lg font-medium transition-all duration-200 mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-3 px-4 rounded-lg font-medium transition-all duration-200 mt-2 text-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Navbar; 