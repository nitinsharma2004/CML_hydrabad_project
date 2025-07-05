# Assam Farmers Platform 🌾

A comprehensive digital platform for farmers, NGOs, and agri-organizations in Assam that provides personalized weather alerts, data-driven recommendations, and centralized farmer data management.


## 🚀  Prompts Documentation
When facing development challenges, use these high-level prompts to think like a senior developer:

### 1. **Port Conflict Resolution & Development Environment Setup**
**Complex:** *"How can I implement a robust development environment configuration with dynamic port allocation, process management, and automatic fallback strategies to prevent EADDRINUSE errors and ensure seamless concurrent development of frontend (Vite) and backend (Express) services while maintaining proper proxy configuration and hot reloading capabilities?"*

**Context:** Your terminal logs show repeated port conflicts on 5001, causing server crashes and development interruptions.

### 2. **Authentication & Session Management Architecture**
**Complex:** *"What enterprise-grade authentication system should I implement with role-based access control, session persistence, and secure token management to handle admin/user role switching, phone verification workflows, and maintain user state across page refreshes while ensuring proper logout functionality and conditional navigation rendering?"*

**Context:** Your Login component has hardcoded credentials and the Navbar shows inconsistent login state management.

### 3. **Multi-language Support & Regional Content Strategy**
**Complex:** *"How can I design a comprehensive internationalization architecture with dynamic language switching, cultural adaptation, and context-aware translations to provide seamless multilingual experience for Assamese, Bengali, Hindi, and other Northeast Indian languages while integrating with Google Translate and maintaining consistent UX patterns across all components?"*

**Context:** You have Google Translate integration but need proper i18n for regional languages.

### 4. **Payment Gateway Integration & Financial Security**
**Complex:** *"What secure payment processing architecture should I implement with Razorpay integration, transaction reconciliation, fraud detection, and comprehensive error handling to ensure reliable donation processing for agricultural projects while maintaining PCI DSS compliance and providing real-time payment status updates?"*

**Context:** Your Donations component has Razorpay integration but needs better error handling and security.

### 5. **Real-time Weather Data & Alert System**
**Complex:** *"How can I build a real-time weather monitoring system with intelligent alert generation, multi-channel notification delivery, and predictive analytics to provide timely weather warnings for farmers in rural Assam while handling intermittent connectivity and ensuring critical alerts reach users through SMS, WhatsApp, and email?"*

**Context:** Your WeatherAlerts component has translation features but needs real-time data integration.

### 6. **AI-Powered Agricultural Advisory System**
**Complex:** *"What intelligent agricultural advisory system should I implement with machine learning models, crop-specific recommendations, and contextual AI responses to provide personalized farming advice for Assam farmers while integrating weather data, soil conditions, and regional best practices through a conversational chatbot interface?"*

**Context:** Your Chatbot component uses Groq API but needs better integration with farming data.

### 7. **Database Architecture & Data Management**
**Complex:** *"How can I design a scalable database architecture with proper data modeling, indexing strategies, and data validation to handle farmer profiles, agricultural data, payment transactions, and analytics while ensuring data integrity, performance optimization, and seamless migration from JSON files to MongoDB?"*

**Context:** You're using JSON files for farmer data but have MongoDB configured.

### 8. **Deployment & Production Environment Strategy**
**Complex:** *"What production deployment strategy should I implement with environment-specific configurations, automated CI/CD pipelines, and monitoring systems to deploy the frontend to Vercel and backend to Render while ensuring proper API URL management, environment variable security, and cross-origin resource sharing configuration?"*

**Context:** Your Donations component has hardcoded API URLs that need environment-based configuration.

### 9. **Mobile-First Responsive Design & Accessibility**
**Complex:** *"How can I implement a mobile-first responsive design system with progressive enhancement, accessibility compliance, and offline capabilities to ensure the platform works seamlessly across all devices and network conditions in rural areas while maintaining consistent user experience and performance optimization?"*

**Context:** Your components have responsive design but need better mobile optimization for rural users.

### 10. **Error Handling & Monitoring Infrastructure**
**Complex:** *"What comprehensive error handling and monitoring system should I implement with distributed tracing, automated alerting, and performance monitoring to quickly identify and resolve production issues in rural deployment scenarios while maintaining system reliability and providing actionable insights for continuous improvement?"*

**Context:** Your server has basic error handling but needs better monitoring for production deployment.

## Features

### 🌤️ Personalized Weather Alerts
- Real-time weather monitoring for each farmer's location
- Severe weather alerts (storms, heavy rain, natural calamities)
- 3-day weather forecast
- Location-specific weather conditions

### 📊 Data-Driven Recommendations
- Crop-specific farming advice
- Seasonal preparation guidelines
- Technology adoption recommendations
- Financial planning and market access tips

### 👨‍🌾 Centralized Farmer Data
- Comprehensive farmer profiles
- Crop and land information
- Contact details and experience


### 🎯 Smart Dashboard
- Modern, responsive React interface
- Real-time data visualization
- User-friendly farmer ID search
- Mobile-friendly design

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Weather API**: OpenWeatherMap (configurable)
- **Icons**: Lucide React
- **Charts**: Recharts (for future analytics)

## Project Structure

```
assam-farmers-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── server/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   └── package.json        # Backend dependencies
├── farmers_data.json       # Farmer data (you provide this)
├── package.json            # Root package.json
└── README.md              # This file
```

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd /path/to/your/project
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

### Running the Application

1. **Start both frontend and backend (recommended)**
   ```bash
   npm run dev
   ```

2. **Or start them separately:**
   
   Backend (Terminal 1):
   ```bash
   npm run server
   ```
   
   Frontend (Terminal 2):
   ```bash
   npm run client
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### For Farmers and NGOs

1. **Access the Dashboard**
   - Open http://localhost:3000 in your browser
   - You'll see the welcome screen with platform information

2. **Search for a Farmer**
   - Enter a farmer ID (e.g., F001, F002, F003)
   - Click "Search" or press Enter
   - View personalized information and recommendations

3. **View Weather Alerts**
   - Current weather conditions for the farmer's location
   - Active weather alerts with severity levels
   - 3-day weather forecast

4. **Get Recommendations**
   - Crop-specific farming advice
   - Seasonal preparation tips
   - Technology adoption suggestions

### Sample Farmer IDs

The system includes sample data for demonstration:
- **F001**: Rice farmer in Guwahati (with weather alerts)
- **F002**: Tea farmer in Jorhat (normal weather)
- **F003**: Mixed crop farmer in Dibrugarh (heat wave alert)

## API Endpoints

### Farmers
- `GET /api/farmers` - Get all farmers
- `GET /api/farmers/:id` - Get farmer by ID
- `GET /api/farmers/search/location/:location` - Search by location
- `GET /api/farmers/search/crop/:crop` - Search by crop

### Weather
- `GET /api/weather/:farmerId` - Get weather data for farmer
- `GET /api/weather/alerts/:location` - Get weather alerts for location
- `GET /api/weather/current/:location` - Get current weather

### Recommendations
- `GET /api/recommendations/:farmerId` - Get personalized recommendations

## Configuration

### Weather API Integration

To use real weather data instead of mock data:

1. **Get API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your API key

2. **Configure Environment**
   - Create `.env` file in server directory
   - Add: `OPENWEATHER_API_KEY=your_api_key_here`

3. **Update Weather Route**
   - Modify `server/routes/weather.js`
   - Replace mock data with actual API calls

### Database Integration

To use a database instead of JSON files:

1. **Install Database Driver**
   ```bash
   cd server
   npm install mongoose  # for MongoDB
   # or
   npm install mysql2    # for MySQL
   ```

2. **Update Data Access Layer**
   - Modify routes to use database queries
   - Implement proper data models

## Customization

### Adding New Crops

1. **Update Recommendations**
   - Add crop-specific logic in `server/routes/recommendations.js`
   - Include best practices and timing

2. **Update Frontend**
   - Add crop icons and specific UI elements
   - Update recommendation display logic

### Adding New Features

1. **Pest Management Alerts**
   - Create new API endpoints
   - Add pest monitoring data
   - Implement alert system

2. **Market Price Integration**
   - Connect to market APIs
   - Add price forecasting
   - Include vendor recommendations

3. **Mobile App**
   - Use React Native
   - Implement push notifications
   - Add offline capabilities

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy to your preferred platform
```

### Environment Variables
```env
PORT=5000
NODE_ENV=production
OPENWEATHER_API_KEY=your_api_key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Enhancements

- [ ] Real-time weather API integration
- [ ] Crop yield prediction models
- [ ] Pest and disease detection
- [ ] Market price forecasting
- [ ] Mobile application
- [ ] Push notifications
- [ ] Offline data sync
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with government schemes

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## License

This project is licensed under the MIT License.

---

**Built with ❤️ for the farmers of Assam** 
