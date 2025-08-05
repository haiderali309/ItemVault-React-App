import { Package, Heart, Github, Mail, Globe, Star } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ItemVault
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              A modern, beautiful item management system built with React. 
              Organize, track, and manage your items with style and efficiency.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/haiderali309"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:haiderali577772@gmail.com"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://haiderali309.github.io/Haider_Ali-Potfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                title="Website"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/add-item"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Add Item</span>
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>About</span>
                </a>
              </li>
              <li>
                <a
                  href="#help"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Help</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Features</h4>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>Modern UI Design</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>Responsive Layout</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>Real-time Search</span>
              </li>
              <li className="text-gray-300 flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>Easy Management</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-300">
              <span>© {currentYear} ItemVault. Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>using React & Tailwind CSS</span>
            </div>

            {/* Version & Status */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">v1.0.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
        <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>
    </footer>
  );
};

export default Footer;