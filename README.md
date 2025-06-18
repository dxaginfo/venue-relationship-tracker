# Venue Relationship Tracker

A web application for musicians to track and manage their relationships with venues, promoters, and booking agents.

## Overview

The Venue Relationship Tracker helps musicians, bands, and music professionals organize their venue contacts, document past performances, track communications, and manage their professional relationships in the music industry.

## Features

- **Venue Management**: Store venue profiles with detailed information, specifications, and categorization
- **Contact Management**: Track venue staff, promoters, and key contact details
- **Performance History**: Record past shows with attendance, revenue, and feedback
- **Communication Tracking**: Log all communication with venue contacts
- **Contract & Financial Management**: Store contracts and track payments
- **Analytics Dashboard**: Visualize booking trends and venue relationships

## Technology Stack

- **Frontend**: React.js with Material-UI
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3
- **Caching**: Redis
- **Deployment**: Docker, GitHub Actions, AWS

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- PostgreSQL (v14 or higher)
- Redis (optional for caching)
- AWS account (for S3 file storage)

### Local Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/dxaginfo/venue-relationship-tracker.git
   cd venue-relationship-tracker
   ```

2. Install dependencies:
   ```
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` in both server and client directories
   - Update the values with your local configurations

4. Setup the database:
   ```
   cd server
   npm run db:setup
   ```

5. Start the development servers:
   ```
   # Start backend server
   cd server
   npm run dev

   # Start frontend server in a new terminal
   cd client
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

### Docker Setup

1. Make sure Docker and Docker Compose are installed
2. Run:
   ```
   docker-compose up
   ```
3. Access the application at `http://localhost:3000`

## Project Structure

```
venue-relationship-tracker/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── services/       # API service calls
│       ├── context/        # React context providers
│       ├── hooks/          # Custom React hooks
│       └── utils/          # Utility functions
├── server/                 # Node.js backend
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/             # Database models
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   └── db/                 # Database migrations & seeds
└── docker-compose.yml      # Docker configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

MIT License - see LICENSE file for details

## Contact

For questions or support, please create an issue in the GitHub repository.