const express = require('express');
const path = require('path');
const fs = require('fs');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const frontendDist = process.env.FRONTEND_DIST_PATH || path.join(__dirname, '..', 'frontend', 'dist');
const frontendIndex = path.join(frontendDist, 'index.html');

// Serve built React Frontend (Monolith UI + API on single service)
if (fs.existsSync(frontendIndex)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => {
    res.sendFile(frontendIndex);
  });
} else {
  app.get('/', (req, res) => {
    res.status(503).json({
      success: false,
      message: 'Frontend bundle not built yet. Run "npm run build" at project root, or use "npm run dev" for development.'
    });
  });
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` UK FASHION - Balochi Bridal Haute Couture`);
    console.log(` Real Media Powered by @kj_.collection`);
    console.log(` Monolith Server Live at: http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}

module.exports = app;
