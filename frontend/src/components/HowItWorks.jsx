import { MousePointerClick, Activity, FileCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MousePointerClick className="w-8 h-8 text-green-400 mb-4" />,
      title: "1. Enter URL",
      description: "Paste your website address into our secure analyzer."
    },
    {
      icon: <Activity className="w-8 h-8 text-green-400 mb-4" />,
      title: "2. Analyze Accessibility",
      description: "Our system scans your page for WCAG compliance violations."
    },
    {
      icon: <FileCheck className="w-8 h-8 text-green-400 mb-4" />,
      title: "3. Get Results",
      description: "Receive a detailed report with actionable improvement steps."
    }
  ];

  return (
    <section className="py-12 max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center text-gray-100 mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center p-6 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-colors">
            <div className="p-3 bg-gray-900/50 rounded-lg shadow-inner mb-2">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
