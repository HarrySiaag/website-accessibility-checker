import { CheckCircle2 } from 'lucide-react';

const WhyItMatters = () => {
  const points = [
    {
      title: "Improves usability for all users",
      description: "Accessible design often leads to clearer layouts and better navigation, benefiting everyone."
    },
    {
      title: "Ensures inclusivity for people with disabilities",
      description: "Empowers users with vision, hearing, or motor impairments to seamlessly interact with your content."
    },
    {
      title: "Enhances SEO and performance",
      description: "Search engines reward semantic HTML, proper structure, and fast load times associated with accessible sites."
    }
  ];

  return (
    <section className="py-12 max-w-4xl mx-auto px-4 mb-8">
      <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 md:p-12 shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-8">Why Accessibility Matters</h2>
        <div className="space-y-6">
          {points.map((point, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-1">{point.title}</h3>
                <p className="text-sm text-gray-400">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
