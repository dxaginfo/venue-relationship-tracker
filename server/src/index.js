const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createLogger, transports, format } = require('winston');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const venueRoutes = require('./routes/venues');
const contactRoutes = require('./routes/contacts');
const performanceRoutes = require('./routes/performances');
const communicationRoutes = require('./routes/communications');
const contractRoutes = require('./routes/contracts');
const paymentRoutes = require('./routes/payments');
const mediaRoutes = require('./routes/media');
const reminderRoutes = require('./routes/reminders');
const analyticsRoutes = require('./routes/analytics');

// Import middleware
const { authenticateJWT } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Configure logger
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Apply basic middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(morgan('combined')); // HTTP request logging

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api/', limiter);

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateJWT, userRoutes);
app.use('/api/venues', authenticateJWT, venueRoutes);
app.use('/api/contacts', authenticateJWT, contactRoutes);
app.use('/api/performances', authenticateJWT, performanceRoutes);
app.use('/api/communications', authenticateJWT, communicationRoutes);
app.use('/api/contracts', authenticateJWT, contractRoutes);
app.use('/api/payments', authenticateJWT, paymentRoutes);
app.use('/api/media', authenticateJWT, mediaRoutes);
app.use('/api/reminders', authenticateJWT, reminderRoutes);
app.use('/api/analytics', authenticateJWT, analyticsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Apply error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  console.error('Unhandled Rejection:', err);
});

module.exports = app; // Export for testing