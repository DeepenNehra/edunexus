const { Router } = require('express');
const { requireAuth } = require('../middleware/auth');
const axios = require('axios');

const router = Router();

// Proxy endpoint to serve Cloudinary files
router.get('/proxy/:fileId', requireAuth, async (req, res) => {
  try {
    const { fileId } = req.params;
    
    // Decode the file URL (base64 encoded for security)
    const fileUrl = Buffer.from(fileId, 'base64').toString('utf-8');
    
    // Validate that it's a Cloudinary URL
    if (!fileUrl.includes('cloudinary.com')) {
      return res.status(400).json({ error: 'Invalid file URL' });
    }
    
    // Fetch the file from Cloudinary
    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'stream'
    });
    
    // Set appropriate headers
    res.set({
      'Content-Type': response.headers['content-type'] || 'application/octet-stream',
      'Content-Disposition': 'inline',
      'Cache-Control': 'public, max-age=3600'
    });
    
    // Pipe the file to the response
    response.data.pipe(res);
    
  } catch (error) {
    console.error('File proxy error:', error.message);
    res.status(500).json({ error: 'Failed to fetch file' });
  }
});

module.exports = router;