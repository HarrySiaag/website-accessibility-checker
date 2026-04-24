import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-3">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Activity className="w-6 h-6 text-green-500" />
        </div>
        <h1 className="text-xl font-semibold text-gray-100 tracking-tight">
          Accessibility Checker
        </h1>
      </div>
    </header>
  );
};

export default Header;
