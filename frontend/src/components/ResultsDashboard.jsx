import { AlertCircle, AlertTriangle, AlertOctagon, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const ScoreDisplay = ({ score }) => {
  let color = 'text-green-500';
  let strokeColor = 'stroke-green-500';
  if (score < 50) { color = 'text-red-500'; strokeColor = 'stroke-red-500'; }
  else if (score < 80) { color = 'text-yellow-500'; strokeColor = 'stroke-yellow-500'; }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle className="stroke-gray-700" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
          <circle 
            className={`transition-all duration-1000 ease-out ${strokeColor}`}
            strokeWidth="8" 
            strokeLinecap="round" 
            cx="50" cy="50" r="40" 
            fill="transparent" 
            strokeDasharray="251.2" 
            strokeDashoffset={251.2 - (251.2 * score) / 100}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${color}`}>{score}</span>
          <span className="text-xs text-gray-400 mt-1">/ 100</span>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-200">Accessibility Score</h3>
    </div>
  );
};

const SeverityCount = ({ type, count }) => {
  const config = {
    critical: { icon: AlertOctagon, color: 'text-red-500', bg: 'bg-red-500/10' },
    serious: { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    moderate: { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    minor: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  };
  const { icon: Icon, color, bg } = config[type];
  
  return (
    <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
      <div className={`p-3 rounded-lg ${bg} mb-2`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <span className="text-2xl font-bold text-gray-100">{count || 0}</span>
      <span className="text-sm text-gray-400 capitalize">{type}</span>
    </div>
  );
};

const IssueCard = ({ issue }) => {
  const [expanded, setExpanded] = useState(false);
  
  const severityColors = {
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    serious: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    minor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <div className="bg-gray-800/40 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-colors">
      <div 
        className="p-4 cursor-pointer flex items-start justify-between gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold uppercase border ${severityColors[issue.severity || 'minor']}`}>
              {issue.severity}
            </span>
            <h4 className="font-medium text-gray-100">{issue.title}</h4>
            <span className="text-sm text-gray-400 ml-auto">{issue.nodesCount} instance(s)</span>
          </div>
          <p className="text-sm text-gray-400">{issue.description}</p>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-200">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>
      
      {expanded && (
        <div className="p-4 pt-0 border-t border-gray-700 mt-2 bg-gray-800/20">
          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-300 mb-3">Elements Affected:</h5>
            <div className="space-y-3">
              {issue.elements.map((el, i) => (
                <div key={i} className="bg-gray-900/50 rounded-lg p-3 text-sm font-mono text-gray-300 overflow-x-auto">
                  <div className="text-xs text-gray-500 mb-1 select-all">{el.target}</div>
                  <div className="whitespace-pre-wrap word-break text-green-400/80 mb-2">{el.html}</div>
                  <div className="text-xs text-orange-300/80 mt-2 whitespace-pre-wrap">{el.failureSummary}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center text-sm">
              <span className="text-gray-400 font-mono text-xs">Rule ID: {issue.id}</span>
              <a href={issue.helpUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                Learn more about this rule &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ResultsDashboard = ({ report }) => {
  if (!report) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <ScoreDisplay score={report.score} />
        </div>
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <SeverityCount type="critical" count={report.severityCounts.critical} />
          <SeverityCount type="serious" count={report.severityCounts.serious} />
          <SeverityCount type="moderate" count={report.severityCounts.moderate} />
          <SeverityCount type="minor" count={report.severityCounts.minor} />
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
          Detected Issues <span className="text-sm font-normal text-gray-400 bg-gray-800 px-2.5 py-0.5 rounded-full">{report.totalIssues} total</span>
        </h3>
        {report.issues.length === 0 ? (
          <div className="text-center p-12 bg-gray-800/30 rounded-2xl border border-gray-700/50">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-lg font-medium text-gray-200">Looking Good!</h4>
            <p className="text-gray-400 mt-2">No accessibility violations found on this page.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {report.issues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDashboard;
