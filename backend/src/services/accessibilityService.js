const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

const calculateScore = (violations) => {
  let penalty = 0;
  
  const weights = {
    critical: 10,
    serious: 5,
    moderate: 2,
    minor: 1
  };

  violations.forEach(violation => {
    const severity = violation.impact || 'minor';
    const weight = weights[severity] || 1;
    // We apply penalty for each node that fails
    const nodeCount = violation.nodes.length;
    penalty += (weight * nodeCount);
  });

  // Normalize score between 0 and 100
  let score = 100 - penalty;
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return Math.max(0, Math.round(score));
};

exports.analyze = async (url) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set a timeout and wait until network idle
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const results = await new AxePuppeteer(page).analyze();

    const score = calculateScore(results.violations);

    // Format violations for the frontend
    const issues = results.violations.map(violation => ({
      id: violation.id,
      title: violation.help,
      description: violation.description,
      helpUrl: violation.helpUrl,
      severity: violation.impact,
      nodesCount: violation.nodes.length,
      tags: violation.tags,
      // Provide suggestions or specific elements
      elements: violation.nodes.map(node => ({
        html: node.html,
        target: node.target.join(' > '),
        failureSummary: node.failureSummary
      }))
    }));

    // Calculate severity counts
    const severityCounts = {
      critical: 0,
      serious: 0,
      moderate: 0,
      minor: 0
    };

    issues.forEach(issue => {
      // Impact can be undefined occasionally, fallback to minor
      const severity = issue.severity || 'minor';
      if (severityCounts[severity] !== undefined) {
        severityCounts[severity] += issue.nodesCount;
      } else {
        severityCounts[severity] = issue.nodesCount;
      }
    });

    return {
      score,
      severityCounts,
      totalIssues: issues.reduce((acc, issue) => acc + issue.nodesCount, 0),
      issues
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
