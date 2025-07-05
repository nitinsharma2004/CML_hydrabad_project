const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/assam-farmers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// Import routes
const farmerRoutes = require('./routes/farmers');
const weatherRoutes = require('./routes/weather');
const recommendationsRoutes = require('./routes/recommendations');
const yieldPredictionRoutes = require('./routes/yield-prediction');
const chatbotRoutes = require('./routes/chatbot');
const womenAnalyticsRoutes = require('./routes/women-analytics');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/admin');

// Routes
app.use('/api/farmers', farmerRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/yield-prediction', yieldPredictionRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/women-analytics', womenAnalyticsRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Translation endpoint (AI-powered, placeholder for now)
app.post('/api/translate', async (req, res) => {
  const { text, language } = req.body;
  // TODO: Integrate with AI translation API
  // For demo, just echo with a prefix
  let translated = '';
  if (language === 'assamese') {
    translated = '[Assamese Translation] ' + text;
  } else if (language === 'hindi') {
    translated = '[Hindi Translation] ' + text;
  } else {
    translated = '[Unknown Language] ' + text;
  }
  res.json({ translated });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Assam Farmers Platform API is running' });
});

// Serve React app for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🌾 Assam Farmers Platform Backend Ready!`);
}); 