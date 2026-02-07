<div align="center">

# 🌾 Agri Assist
## AI-Powered Smart Farming Pla

## 🌿 Overview
Agri_Assist is an AI-driven platform designed to empower farmers with data-backed insights. By leveraging machine learning and real-time data, it helps optimize crop yields, monitor soil health, and provide actionable agricultural advice.

## ✨ Key Features
- **Crop Recommendation:** Predicts the best crops to grow based on soil and weather parameters.
- **Disease Detection:** Identifies plant diseases using image processing/AI (if applicable).
- **Market Insights:** Real-time price tracking for various commodities.
- **Sustainability:** Focused on promoting eco-friendly farming practices.

## 🛠 Tech Stack
- **Backend:** Python (Flask)
- **AI/ML:** OpenAI API, Scikit-learn
- **Frontend:** HTML, CSS, JavaScript
- **Database:** SQL / SQLite

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- OpenAI API Key

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/rajsurya519sr/Agri_Assist.git
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up environment variables:
   - Create a `.env` file and add your `OPENAI_API_KEY`.

4. Run the application:
   ```bash
   python app.py
   ```

## 📈 Future Enhancements
- Integration with IoT sensors for live field monitoring.
- Multilingual support for regional languages.
- Mobile application for easier access.

---
<p align="center">Made with ❤️ for the Agriculture Community</p>
tform

[![Python](https://img.shields.io/badge/Python-3.9+-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-red?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-green?logo=openai&logoColor=white)](https://openai.com/)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

*An intelligent agricultural assistant providing AI-driven crop recommendations, weather-integrated advisories, and yield predictions for smart farming.*

[Live Demo](https://agri-assist-coral.vercel.app) • [Report Bug](https://github.com/rajsurya519sr/Agri_Assist/issues) • [Request Feature](https://github.com/rajsurya519sr/Agri_Assist/issues)

</div>

---

## 🎉 Features

### 🗺️ Geospatial Mapping & Land Area Calculation
- Interactive farm boundary drawing using Leaflet.js
- Real-time land area calculation
- OpenStreetMap integration for accurate mapping
- Polygon-based farm boundary visualization

### 🌦️ Weather-Integrated Crop Advisories
- Real-time weather data integration using Open-Meteo API
- Weather-based crop recommendations
- Seasonal crop suggestions
- Climate-aware farming decisions

### 🤖 Rule-Based AI Engine
- Intelligent crop advisory system
- Soil-type based recommendations
- Pest and disease prevention alerts
- Fertilizer usage optimization

### 📊 Yield Predictions
- AI-powered yield forecasting using OpenAI API
- Historical data analysis
- Production planning assistance
- Market trend insights

### 🔐 Secure Authentication
- User authentication with Bcrypt encryption
- OTP-based email verification
- Session management
- Role-based access control

---

## 🚀 Getting Started

### Prerequisites

```bash
Python 3.9+
Flask 2.0+
MySQL/PostgreSQL
OpenAI API Key
Open-Meteo API Access
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajsurya519sr/Agri_Assist.git
   cd Agri_Assist
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and database credentials
   ```

5. **Initialize database**
   ```bash
   python
   from app import db
   db.create_all()
   ```

6. **Run the application**
   ```bash
   python app.py
   # Visit http://localhost:5000
   ```

---

## 💼 Tech Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: MySQL/PostgreSQL with SQLAlchemy ORM
- **Authentication**: Bcrypt for password hashing
- **APIs**: OpenAI API for AI recommendations, Open-Meteo for weather data

### Frontend
- **HTML5**, **CSS3**, **JavaScript**
- **Mapping**: Leaflet.js with OpenStreetMap
- **Responsive Design**: Mobile-first approach

### DevOps & Deployment
- **Version Control**: Git & GitHub
- **Deployment**: Vercel (Frontend), Cloud providers (Backend)
- **Environment Management**: dotenv

---

## 📊 Project Structure

```
Agri_Assist/
├── app.py                 # Main Flask application
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── .env.example           # Environment variables template
├──
├── models/                # Database models
├── routes/                # Flask routes & endpoints
├── services/              # Business logic & AI services
├─┠ templates/             # HTML templates
├─┠ static/                # CSS, JavaScript, Images
└── tests/                 # Unit and integration tests
```

---

## 👥 Usage

### Getting Started

1. **Register/Login** to your account
2. **Draw Your Farm Boundary** on the interactive map
3. **System calculates** your farm's area automatically
4. **View AI Recommendations** based on:
   - Current weather conditions
   - Soil type
   - Climate zone
   - Seasonal factors
5. **Monitor Yield Predictions** and optimize farming decisions

### API Endpoints

```
POST   /api/auth/register        - User registration
POST   /api/auth/login           - User login
GET    /api/weather              - Get weather data
POST   /api/farm/boundary        - Save farm boundary
GET    /api/recommendations      - Get crop recommendations
GET    /api/yield-prediction     - Get yield forecast
GET    /api/pest-alerts          - Get pest warnings
```

---

## 📚 Key Functionalities

### 1. Farm Mapping Module
- Draw and edit farm boundaries
- Calculate area in real-time
- Save multiple farms
- Export farm data

### 2. AI Recommendation Engine
```python
# Example: Get crop recommendations
recommendations = ai_engine.get_recommendations(
    farm_id=farm_id,
    weather_data=current_weather,
    soil_type="loamy",
    climate_zone="tropical"
)
```

### 3. Weather Integration
- Real-time temperature, humidity, rainfall data
- Seasonal forecasts
- Agricultural warnings
- Climate-based alerts

### 4. Yield Prediction
- Historical yield analysis
- Market price predictions
- Production planning
- Profitability estimation

---

## 📝 API Documentation

### Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

### Get Recommendations
```bash
curl -X GET http://localhost:5000/api/recommendations \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🚣 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced ML models for yield prediction
- [ ] Drone integration for farm monitoring
- [ ] Blockchain-based supply chain tracking
- [ ] Multi-language support
- [ ] Real-time crop disease detection
- [ ] IoT sensor integration
- [ ] Market price tracking

---

## 🤛 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the code style.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙋 Support

If you found this project helpful, please consider:
- ⭐ Starring the repository
- 📏 Sharing with others
- 💪 Contributing improvements
- 📧 Providing feedback

---

## 👤 Author

**Surya Raj**
- GitHub: [@rajsurya519sr](https://github.com/rajsurya519sr)
- LinkedIn: [Surya Raj](http://in/suryaraj)
- Email: rajsurya519sr@gmail.com

---

<div align="center">

**Made with ❤️ by [Surya Raj](https://github.com/rajsurya519sr)**

[Back to top](#agri-assist)

</div>
