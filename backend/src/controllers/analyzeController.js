const accessibilityService = require('../services/accessibilityService');

exports.analyzeUrl = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const report = await accessibilityService.analyze(url);
    res.json(report);

  } catch (error) {
    console.error('Error analyzing URL:', error);
    res.status(500).json({ 
      error: 'Failed to analyze URL', 
      details: error.message 
    });
  }
};
