import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

const AnalyzerInput = ({ onScan, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      let submitUrl = url.trim();
      if (!submitUrl.startsWith('http://') && !submitUrl.startsWith('https://')) {
        submitUrl = 'https://' + submitUrl;
      }
      onScan(submitUrl);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 mb-10 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-50 mb-3">Check WCAG Compliance instantly</h2>
        <p className="text-gray-400">Enter your website URL to scan for accessibility issues and receive a comprehensive score and actionable insights.</p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
        </div>
        <input
          type="url"
          className="block w-full p-4 pl-12 pr-32 text-sm text-gray-100 bg-gray-800/80 border border-gray-700 rounded-xl focus:ring-1 focus:ring-green-500 focus:border-green-500 placeholder-gray-500 transition-all shadow-lg"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="absolute right-2 top-2 bottom-2 px-6 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-500 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shadow-md hover:shadow-green-500/25 focus:ring-4 focus:outline-none focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100 transition-all duration-300 flex items-center justify-center min-w-[100px]"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Scan Now'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button 
          type="button" 
          onClick={() => setUrl('https://example.com')}
          className="text-sm text-gray-400 hover:text-green-400 transition-colors"
        >
          Try Example: <span className="underline decoration-gray-600 underline-offset-4 hover:decoration-green-400">https://example.com</span>
        </button>
      </div>
    </div>
  );
};

export default AnalyzerInput;
