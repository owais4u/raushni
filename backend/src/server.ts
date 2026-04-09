import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'raushni-backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API root
app.get('/api', (req, res) => {
  res.json({
    name: 'Raushni NGO API',
    version: '1.0.0',
    endpoints: [
      '/health',
      '/api/members',
      '/api/donations',
      '/api/projects'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Raushni Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API root: http://localhost:${PORT}/api`);
});
