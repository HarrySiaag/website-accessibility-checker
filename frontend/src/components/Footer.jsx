const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-800 bg-gray-900 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              © 2026 Accessibility Checker. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Built with React, Node.js & axe-core.
            </p>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-400">
            <a 
              href="#" 
              className="hover:text-green-400 transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-400 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
