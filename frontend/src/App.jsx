import { useState } from 'react';
import axios from 'axios';
import { AlertCircle } from 'lucide-react';
import Header from './components/Header';
import AnalyzerInput from './components/AnalyzerInput';
import ResultsDashboard from './components/ResultsDashboard';
import HowItWorks from './components/HowItWorks';
import WhyItMatters from './components/WhyItMatters';
import Footer from './components/Footer';

function App() {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async (url) => {
    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      // Use relative path; Vite proxy or Express static serving will handle it
      const apiUrl = import.meta.env.VITE_API_URL || '/api/analyze';
      
      const response = await axios.post(apiUrl, { url });
      setReport(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || 
        err.message || 
        'An error occurred while scanning the website. Please check the URL or try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 selection:bg-green-500/30">
      <Header />
      
      <main className="flex-grow pt-8 pb-12">
        <AnalyzerInput onScan={handleScan} isLoading={isLoading} />
        
        {error && (
          <div className="max-w-2xl mx-auto px-4 mb-8 animate-in fade-in slide-in-from-top-2">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex gap-3 text-red-200">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-400 mb-1">Scan Failed</h4>
                <p className="text-sm">{error}</p>
                <p className="text-xs text-red-400/70 mt-2">Note: Some websites actively block automated scanners (like Cloudflare protection).</p>
              </div>
            </div>
          </div>
        )}

        {report && !isLoading && (
          <ResultsDashboard report={report} />
        )}

        {!report && !isLoading && !error && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <HowItWorks />
            <WhyItMatters />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
