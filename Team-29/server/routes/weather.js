const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;

// Groq API for AI-driven alerts
const GROQ_API_KEY = '';
const GROQ_MODEL = '';

// Mock weather data for all farmers
const mockWeatherData = {
  "101": {
    current: { temperature: 29, humidity: 72, windSpeed: 11, visibility: 7 },
    forecast: [
      { day: "Mon", high: 31, low: 25, condition: "Rain" },
      { day: "Tue", high: 33, low: 27, condition: "Partly Cloudy" },
      { day: "Wed", high: 32, low: 26, condition: "Sunny" }
    ]
  },
  "102": {
    current: { temperature: 28, humidity: 75, windSpeed: 8, visibility: 9 },
    forecast: [
      { day: "Mon", high: 30, low: 24, condition: "Storm" },
      { day: "Tue", high: 29, low: 23, condition: "Partly Cloudy" },
      { day: "Wed", high: 31, low: 25, condition: "Sunny" }
    ]
  },
  "103": {
    current: { temperature: 27, humidity: 80, windSpeed: 6, visibility: 8 },
    forecast: [
      { day: "Mon", high: 29, low: 23, condition: "Cloudy" },
      { day: "Tue", high: 31, low: 25, condition: "Partly Cloudy" },
      { day: "Wed", high: 30, low: 24, condition: "Sunny" }
    ]
  },
  "104": {
    current: { temperature: 30, humidity: 70, windSpeed: 12, visibility: 10 },
    forecast: [
      { day: "Mon", high: 32, low: 26, condition: "Sunny" },
      { day: "Tue", high: 31, low: 25, condition: "Partly Cloudy" },
      { day: "Wed", high: 33, low: 27, condition: "Sunny" }
    ]
  },
  "105": {
    current: { temperature: 29, humidity: 72, windSpeed: 11, visibility: 7 },
    forecast: [
      { day: "Mon", high: 31, low: 25, condition: "Rain" },
      { day: "Tue", high: 33, low: 27, condition: "Partly Cloudy" },
      { day: "Wed", high: 32, low: 26, condition: "Sunny" }
    ]
  },
  "106": {
    current: { temperature: 26, humidity: 78, windSpeed: 9, visibility: 6 },
    forecast: [
      { day: "Mon", high: 28, low: 22, condition: "Cloudy" },
      { day: "Tue", high: 30, low: 24, condition: "Partly Cloudy" },
      { day: "Wed", high: 29, low: 23, condition: "Sunny" }
    ]
  },
  "107": {
    current: { temperature: 31, humidity: 68, windSpeed: 14, visibility: 11 },
    forecast: [
      { day: "Mon", high: 33, low: 27, condition: "Sunny" },
      { day: "Tue", high: 32, low: 26, condition: "Partly Cloudy" },
      { day: "Wed", high: 34, low: 28, condition: "Sunny" }
    ]
  },
  "108": {
    current: { temperature: 28, humidity: 74, windSpeed: 7, visibility: 8 },
    forecast: [
      { day: "Mon", high: 30, low: 24, condition: "Partly Cloudy" },
      { day: "Tue", high: 29, low: 23, condition: "Cloudy" },
      { day: "Wed", high: 31, low: 25, condition: "Sunny" }
    ]
  },
  "109": {
    current: { temperature: 32, humidity: 65, windSpeed: 15, visibility: 10 },
    forecast: [
      { day: "Mon", high: 34, low: 28, condition: "Sunny" },
      { day: "Tue", high: 33, low: 27, condition: "Partly Cloudy" },
      { day: "Wed", high: 35, low: 29, condition: "Sunny" }
    ]
  },
  "110": {
    current: { temperature: 25, humidity: 82, windSpeed: 5, visibility: 5 },
    forecast: [
      { day: "Mon", high: 27, low: 21, condition: "Rain" },
      { day: "Tue", high: 26, low: 20, condition: "Cloudy" },
      { day: "Wed", high: 28, low: 22, condition: "Partly Cloudy" }
    ]
  },
  "111": {
    current: { temperature: 27, humidity: 76, windSpeed: 10, visibility: 7 },
    forecast: [
      { day: "Mon", high: 29, low: 23, condition: "Partly Cloudy" },
      { day: "Tue", high: 31, low: 25, condition: "Sunny" },
      { day: "Wed", high: 30, low: 24, condition: "Cloudy" }
    ]
  },
  "112": {
    current: { temperature: 26, humidity: 79, windSpeed: 8, visibility: 6 },
    forecast: [
      { day: "Mon", high: 28, low: 22, condition: "Rain" },
      { day: "Tue", high: 27, low: 21, condition: "Cloudy" },
      { day: "Wed", high: 29, low: 23, condition: "Partly Cloudy" }
    ]
  },
  "113": {
    current: { temperature: 29, humidity: 71, windSpeed: 12, visibility: 9 },
    forecast: [
      { day: "Mon", high: 31, low: 25, condition: "Sunny" },
      { day: "Tue", high: 30, low: 24, condition: "Partly Cloudy" },
      { day: "Wed", high: 32, low: 26, condition: "Sunny" }
    ]
  },
  "114": {
    current: { temperature: 28, humidity: 73, windSpeed: 9, visibility: 8 },
    forecast: [
      { day: "Mon", high: 30, low: 24, condition: "Cloudy" },
      { day: "Tue", high: 29, low: 23, condition: "Partly Cloudy" },
      { day: "Wed", high: 31, low: 25, condition: "Sunny" }
    ]
  },
  "115": {
    current: { temperature: 30, humidity: 69, windSpeed: 13, visibility: 10 },
    forecast: [
      { day: "Mon", high: 32, low: 26, condition: "Sunny" },
      { day: "Tue", high: 31, low: 25, condition: "Partly Cloudy" },
      { day: "Wed", high: 33, low: 27, condition: "Sunny" }
    ]
  },
  "116": {
    current: { temperature: 25, humidity: 81, windSpeed: 6, visibility: 5 },
    forecast: [
      { day: "Mon", high: 27, low: 21, condition: "Rain" },
      { day: "Tue", high: 26, low: 20, condition: "Cloudy" },
      { day: "Wed", high: 28, low: 22, condition: "Partly Cloudy" }
    ]
  },
  "117": {
    current: { temperature: 29, humidity: 72, windSpeed: 11, visibility: 7 },
    forecast: [
      { day: "Mon", high: 31, low: 25, condition: "Partly Cloudy" },
      { day: "Tue", high: 30, low: 24, condition: "Cloudy" },
      { day: "Wed", high: 32, low: 26, condition: "Sunny" }
    ]
  },
  "118": {
    current: { temperature: 27, humidity: 77, windSpeed: 8, visibility: 6 },
    forecast: [
      { day: "Mon", high: 29, low: 23, condition: "Rain" },
      { day: "Tue", high: 28, low: 22, condition: "Cloudy" },
      { day: "Wed", high: 30, low: 24, condition: "Partly Cloudy" }
    ]
  },
  "119": {
    current: { temperature: 31, humidity: 67, windSpeed: 14, visibility: 11 },
    forecast: [
      { day: "Mon", high: 33, low: 27, condition: "Sunny" },
      { day: "Tue", high: 32, low: 26, condition: "Partly Cloudy" },
      { day: "Wed", high: 34, low: 28, condition: "Sunny" }
    ]
  },
  "120": {
    current: { temperature: 26, humidity: 80, windSpeed: 7, visibility: 6 },
    forecast: [
      { day: "Mon", high: 28, low: 22, condition: "Cloudy" },
      { day: "Tue", high: 27, low: 21, condition: "Rain" },
      { day: "Wed", high: 29, low: 23, condition: "Partly Cloudy" }
    ]
  },
  "121": {
    current: { temperature: 28, humidity: 74, windSpeed: 10, visibility: 8 },
    forecast: [
      { day: "Mon", high: 30, low: 24, condition: "Partly Cloudy" },
      { day: "Tue", high: 29, low: 23, condition: "Cloudy" },
      { day: "Wed", high: 31, low: 25, condition: "Sunny" }
    ]
  },
  "122": {
    current: { temperature: 25, humidity: 82, windSpeed: 5, visibility: 5 },
    forecast: [
      { day: "Mon", high: 27, low: 21, condition: "Rain" },
      { day: "Tue", high: 26, low: 20, condition: "Cloudy" },
      { day: "Wed", high: 28, low: 22, condition: "Partly Cloudy" }
    ]
  },
  "123": {
    current: { temperature: 29, humidity: 71, windSpeed: 12, visibility: 9 },
    forecast: [
      { day: "Mon", high: 31, low: 25, condition: "Sunny" },
      { day: "Tue", high: 30, low: 24, condition: "Partly Cloudy" },
      { day: "Wed", high: 32, low: 26, condition: "Sunny" }
    ]
  },
  "124": {
    current: { temperature: 27, humidity: 76, windSpeed: 9, visibility: 7 },
    forecast: [
      { day: "Mon", high: 29, low: 23, condition: "Cloudy" },
      { day: "Tue", high: 28, low: 22, condition: "Partly Cloudy" },
      { day: "Wed", high: 30, low: 24, condition: "Sunny" }
    ]
  },
  "125": {
    current: { temperature: 30, humidity: 68, windSpeed: 13, visibility: 10 },
    forecast: [
      { day: "Mon", high: 32, low: 26, condition: "Sunny" },
      { day: "Tue", high: 31, low: 25, condition: "Partly Cloudy" },
      { day: "Wed", high: 33, low: 27, condition: "Sunny" }
    ]
  },
  "126": {
    current: { temperature: 26, humidity: 79, windSpeed: 8, visibility: 6 },
    forecast: [
      { day: "Mon", high: 28, low: 22, condition: "Rain" },
      { day: "Tue", high: 27, low: 21, condition: "Cloudy" },
      { day: "Wed", high: 29, low: 23, condition: "Partly Cloudy" }
    ]
  },
  "127": {
    current: { temperature: 28, humidity: 73, windSpeed: 10, visibility: 8 },
    forecast: [
      { day: "Mon", high: 30, low: 24, condition: "Partly Cloudy" },
      { day: "Tue", high: 29, low: 23, condition: "Cloudy" },
      { day: "Wed", high: 31, low: 25, condition: "Sunny" }
    ]
  },
  "128": {
    current: { temperature: 25, humidity: 81, windSpeed: 6, visibility: 5 },
    forecast: [
      { day: "Mon", high: 27, low: 21, condition: "Rain" },
      { day: "Tue", high: 26, low: 20, condition: "Cloudy" },
      { day: "Wed", high: 28, low: 22, condition: "Partly Cloudy" }
    ]
  },
  "129": {
    current: { temperature: 29, humidity: 72, windSpeed: 11, visibility: 7 },
    forecast: [
      { day: "Mon", high: 31, low: 25, condition: "Partly Cloudy" },
      { day: "Tue", high: 30, low: 24, condition: "Cloudy" },
      { day: "Wed", high: 32, low: 26, condition: "Sunny" }
    ]
  },
  "130": {
    current: { temperature: 27, humidity: 77, windSpeed: 8, visibility: 6 },
    forecast: [
      { day: "Mon", high: 29, low: 23, condition: "Rain" },
      { day: "Tue", high: 28, low: 22, condition: "Cloudy" },
      { day: "Wed", high: 30, low: 24, condition: "Partly Cloudy" }
    ]
  },
  "131": {
    current: { temperature: 31, humidity: 67, windSpeed: 14, visibility: 11 },
    forecast: [
      { day: "Mon", high: 33, low: 27, condition: "Sunny" },
      { day: "Tue", high: 32, low: 26, condition: "Partly Cloudy" },
      { day: "Wed", high: 34, low: 28, condition: "Sunny" }
    ]
  },
  "132": {
    current: { temperature: 26, humidity: 80, windSpeed: 7, visibility: 6 },
    forecast: [
      { day: "Mon", high: 28, low: 22, condition: "Cloudy" },
      { day: "Tue", high: 27, low: 21, condition: "Rain" },
      { day: "Wed", high: 29, low: 23, condition: "Partly Cloudy" }
    ]
  },
  "133": {
    current: { temperature: 28, humidity: 74, windSpeed: 10, visibility: 8 },
    forecast: [
      { day: "Mon", high: 30, low: 24, condition: "Partly Cloudy" },
      { day: "Tue", high: 29, low: 23, condition: "Cloudy" },
      { day: "Wed", high: 31, low: 25, condition: "Sunny" }
    ]
  },
  "134": {
    current: { temperature: 25, humidity: 82, windSpeed: 5, visibility: 5 },
    forecast: [
      { day: "Mon", high: 27, low: 21, condition: "Rain" },
      { day: "Tue", high: 26, low: 20, condition: "Cloudy" },
      { day: "Wed", high: 28, low: 22, condition: "Partly Cloudy" }
    ]
  },
  "135": {
    current: { temperature: 29, humidity: 71, windSpeed: 12, visibility: 9 },
    forecast: [
      { day: "Mon", high: 31, low: 25, condition: "Sunny" },
      { day: "Tue", high: 30, low: 24, condition: "Partly Cloudy" },
      { day: "Wed", high: 32, low: 26, condition: "Sunny" }
    ]
  },
  "136": {
    current: { temperature: 27, humidity: 76, windSpeed: 9, visibility: 7 },
    forecast: [
      { day: "Mon", high: 29, low: 23, condition: "Cloudy" },
      { day: "Tue", high: 28, low: 22, condition: "Partly Cloudy" },
      { day: "Wed", high: 30, low: 24, condition: "Sunny" }
    ]
  },
  "137": {
    current: { temperature: 30, humidity: 68, windSpeed: 13, visibility: 10 },
    forecast: [
      { day: "Mon", high: 32, low: 26, condition: "Sunny" },
      { day: "Tue", high: 31, low: 25, condition: "Partly Cloudy" },
      { day: "Wed", high: 33, low: 27, condition: "Sunny" }
    ]
  },
  "138": {
    current: { temperature: 26, humidity: 79, windSpeed: 8, visibility: 6 },
    forecast: [
      { day: "Mon", high: 28, low: 22, condition: "Rain" },
      { day: "Tue", high: 27, low: 21, condition: "Cloudy" },
      { day: "Wed", high: 29, low: 23, condition: "Partly Cloudy" }
    ]
  },
  "139": {
    current: { temperature: 28, humidity: 73, windSpeed: 10, visibility: 8 },
    forecast: [
      { day: "Mon", high: 30, low: 24, condition: "Partly Cloudy" },
      { day: "Tue", high: 29, low: 23, condition: "Cloudy" },
      { day: "Wed", high: 31, low: 25, condition: "Sunny" }
    ]
  },
  "140": {
    current: { temperature: 25, humidity: 81, windSpeed: 6, visibility: 5 },
    forecast: [
      { day: "Mon", high: 27, low: 21, condition: "Rain" },
      { day: "Tue", high: 26, low: 20, condition: "Cloudy" },
      { day: "Wed", high: 28, low: 22, condition: "Partly Cloudy" }
    ]
  }
};

// Enhanced mock weather data based on farmer locations and crops
const generateWeatherData = (farmerId, farmer) => {
  const baseData = {
    '101': { // Ramesh Das - Kamrup (Rice, Lemon)
      location: 'Kamrup',
      current: {
        temperature: 28,
        humidity: 75,
        windSpeed: 12,
        visibility: 8,
        condition: 'Partly Cloudy'
      },
      alerts: [
        {
          title: 'Heavy Rainfall Warning',
          description: 'Heavy rainfall expected in the next 24 hours. Take necessary precautions for your rice crops.',
          severity: 'high',
          validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      forecast: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          high: 30,
          low: 24,
          condition: 'Rain'
        },
        {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          high: 32,
          low: 26,
          condition: 'Partly Cloudy'
        },
        {
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          high: 29,
          low: 23,
          condition: 'Sunny'
        }
      ]
    },
    '102': { // Sita Devi - Jorhat (Black Pepper, Pineapple)
      location: 'Jorhat',
      current: {
        temperature: 26,
        humidity: 80,
        windSpeed: 8,
        visibility: 6,
        condition: 'Overcast'
      },
      alerts: [
        {
          title: 'Storm Warning',
          description: 'Strong winds and thunderstorms expected. Protect your pineapple crops.',
          severity: 'medium',
          validUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()
        }
      ],
      forecast: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          high: 28,
          low: 22,
          condition: 'Storm'
        },
        {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          high: 30,
          low: 24,
          condition: 'Partly Cloudy'
        },
        {
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          high: 31,
          low: 25,
          condition: 'Sunny'
        }
      ]
    },
    '103': { // Amit Roy - Dibrugarh (Rice)
      location: 'Dibrugarh',
      current: {
        temperature: 32,
        humidity: 65,
        windSpeed: 15,
        visibility: 10,
        condition: 'Sunny'
      },
      alerts: [
        {
          title: 'Heat Wave Alert',
          description: 'High temperatures expected. Ensure adequate irrigation for your rice crops.',
          severity: 'medium',
          validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
        }
      ],
      forecast: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          high: 34,
          low: 28,
          condition: 'Sunny'
        },
        {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          high: 33,
          low: 27,
          condition: 'Partly Cloudy'
        },
        {
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          high: 31,
          low: 25,
          condition: 'Cloudy'
        }
      ]
    },
    '104': { // Binita Kalita - Sonitpur (Pineapple)
      location: 'Sonitpur',
      current: {
        temperature: 27,
        humidity: 70,
        windSpeed: 10,
        visibility: 9,
        condition: 'Cloudy'
      },
      alerts: [],
      forecast: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          high: 29,
          low: 23,
          condition: 'Cloudy'
        },
        {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          high: 31,
          low: 25,
          condition: 'Partly Cloudy'
        },
        {
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          high: 30,
          low: 24,
          condition: 'Sunny'
        }
      ]
    },
    '105': { // Pranab Deka - Darrang (Rice, Black Pepper)
      location: 'Darrang',
      current: {
        temperature: 29,
        humidity: 72,
        windSpeed: 11,
        visibility: 7,
        condition: 'Partly Cloudy'
      },
      alerts: [
        {
          title: 'Moderate Rainfall Alert',
          description: 'Moderate rainfall expected. Good for rice crops but monitor black pepper.',
          severity: 'low',
          validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
        }
      ],
      forecast: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          high: 31,
          low: 25,
          condition: 'Rain'
        },
        {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          high: 33,
          low: 27,
          condition: 'Partly Cloudy'
        },
        {
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          high: 32,
          low: 26,
          condition: 'Sunny'
        }
      ]
    },
    '106': { // Juri Barman - Nagaon (Lemon)
      location: 'Nagaon',
      current: {
        temperature: 25,
        humidity: 68,
        windSpeed: 9,
        visibility: 8,
        condition: 'Clear'
      },
      alerts: [],
      forecast: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          high: 27,
          low: 21,
          condition: 'Clear'
        },
        {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          high: 29,
          low: 23,
          condition: 'Partly Cloudy'
        },
        {
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          high: 28,
          low: 22,
          condition: 'Sunny'
        }
      ]
    },
    '107': { // Dipak Nath - Cachar (Rice, Pineapple)
      location: 'Cachar',
      current: {
        temperature: 30,
        humidity: 78,
        windSpeed: 13,
        visibility: 5,
        condition: 'Foggy'
      },
      alerts: [
        {
          title: 'Fog Alert',
          description: 'Dense fog conditions. Reduced visibility may affect farm operations.',
          severity: 'medium',
          validUntil: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()
        }
      ],
      forecast: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          high: 32,
          low: 26,
          condition: 'Foggy'
        },
        {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          high: 34,
          low: 28,
          condition: 'Partly Cloudy'
        },
        {
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          high: 31,
          low: 25,
          condition: 'Clear'
        }
      ]
    }
  };

  // Return specific data for known farmers, or generate generic data for others
  return baseData[farmerId] || {
    location: farmer?.village || 'Unknown',
    current: {
      temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
      humidity: Math.floor(Math.random() * 30) + 60, // 60-90%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
      condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Overcast'][Math.floor(Math.random() * 4)]
    },
    alerts: [],
    forecast: [
      {
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        high: Math.floor(Math.random() * 10) + 25,
        low: Math.floor(Math.random() * 10) + 20,
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy'][Math.floor(Math.random() * 3)]
      },
      {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        high: Math.floor(Math.random() * 10) + 25,
        low: Math.floor(Math.random() * 10) + 20,
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy'][Math.floor(Math.random() * 3)]
      },
      {
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        high: Math.floor(Math.random() * 10) + 25,
        low: Math.floor(Math.random() * 10) + 20,
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy'][Math.floor(Math.random() * 3)]
      }
    ]
  };
};

// Function to generate AI-driven weather alerts
async function generateAIWeatherAlerts(farmerData, weatherData) {
  try {
    // Check if there are any concerning weather conditions first
    const hasConcerningConditions = 
      weatherData.current.temperature > 32 || 
      weatherData.current.temperature < 15 ||
      weatherData.current.humidity > 85 ||
      weatherData.current.windSpeed > 15 ||
      weatherData.forecast.some(day => 
        day.condition.toLowerCase().includes('storm') ||
        day.condition.toLowerCase().includes('heavy rain') ||
        day.high > 35 ||
        day.low < 10
      );

    // If no concerning conditions, return minimal or no alerts
    if (!hasConcerningConditions) {
      return [{
        title: "Weather Conditions Normal",
        description: "Current weather conditions are suitable for your crops. Continue regular farming activities.",
        severity: "low",
        valid_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }];
    }

    const prompt = `
Farmer Information:
- ID: ${farmerData.id}
- Name: ${farmerData.full_name}
- Location: ${farmerData.village}, ${farmerData.district}, ${farmerData.state}
- Crops: ${farmerData.crops.join(', ')}
- Land Size: ${farmerData.land_size_acres} acres
- Soil Type: ${farmerData.soil_type}
- Farming Practices: ${farmerData.agri_practices.join(', ')}

Current Weather:
- Temperature: ${weatherData.current.temperature}°C
- Humidity: ${weatherData.current.humidity}%
- Wind Speed: ${weatherData.current.windSpeed} km/h
- Visibility: ${weatherData.current.visibility} km

3-Day Forecast:
${weatherData.forecast.map((day, index) => {
  const date = new Date(day.date);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  return `- ${dayName}: High ${day.high}°C, Low ${day.low}°C, ${day.condition}`;
}).join('\n')}

Based on this farmer's specific crops, location, and farming practices, generate 1-2 personalized weather alerts ONLY if there are concerning weather conditions. Focus on:
1. Crop-specific risks and opportunities
2. Location-specific concerns (flood-prone areas, soil type considerations)
3. Actionable recommendations for this specific farmer

Format the response as a JSON array with objects containing: title, description, severity (low/medium/high), and valid_until (24 hours from now).

Example format:
[
  {
    "title": "Rice Crop Alert",
    "description": "Moderate rainfall expected. Good for rice crops but monitor black pepper.",
    "severity": "low",
    "valid_until": "2025-06-29T06:48:56"
  }
]

Only return the JSON array, no other text. If weather conditions are normal, return an empty array.`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: 'You are an expert agricultural weather advisor for Assam, India. Generate personalized weather alerts based on farmer-specific data. Only generate alerts when there are actual weather concerns. Return only valid JSON arrays.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.choices?.[0]?.message?.content;
    
    // Try to parse the JSON response
    try {
      const alerts = JSON.parse(aiResponse);
      return Array.isArray(alerts) ? alerts : [];
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback to default alerts only if there are concerning conditions
      return hasConcerningConditions ? generateDefaultAlerts(farmerData, weatherData) : [];
    }
  } catch (error) {
    console.error('AI weather alerts error:', error);
    // Fallback to default alerts only if there are concerning conditions
    const hasConcerningConditions = 
      weatherData.current.temperature > 32 || 
      weatherData.current.temperature < 15 ||
      weatherData.current.humidity > 85 ||
      weatherData.current.windSpeed > 15;
    
    return hasConcerningConditions ? generateDefaultAlerts(farmerData, weatherData) : [];
  }
}

// Fallback function for default alerts
function generateDefaultAlerts(farmerData, weatherData) {
  const alerts = [];
  const now = new Date();
  const validUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

  // Only generate alerts for concerning conditions
  let hasAlerts = false;

  // Temperature-based alerts (only for extreme conditions)
  if (weatherData.current.temperature > 35) {
    alerts.push({
      title: "High Temperature Alert",
      description: `High temperature of ${weatherData.current.temperature}°C may stress ${farmerData.crops.join(', ')} crops. Ensure adequate irrigation.`,
      severity: "medium",
      valid_until: validUntil
    });
    hasAlerts = true;
  } else if (weatherData.current.temperature < 10) {
    alerts.push({
      title: "Low Temperature Alert",
      description: `Low temperature of ${weatherData.current.temperature}°C may affect ${farmerData.crops.join(', ')} crops. Consider protective measures.`,
      severity: "medium",
      valid_until: validUntil
    });
    hasAlerts = true;
  }

  // Severe weather alerts
  if (weatherData.forecast.some(day => day.condition.toLowerCase().includes('storm'))) {
    alerts.push({
      title: "Storm Warning",
      description: `Storm conditions expected. Protect vulnerable crops like ${farmerData.crops.includes('Pineapple') ? 'pineapple' : 'fruits'}.`,
      severity: "high",
      valid_until: validUntil
    });
    hasAlerts = true;
  }

  // High wind alerts
  if (weatherData.current.windSpeed > 20) {
    alerts.push({
      title: "High Wind Alert",
      description: `Strong winds of ${weatherData.current.windSpeed} km/h. Secure crops and equipment.`,
      severity: "medium",
      valid_until: validUntil
    });
    hasAlerts = true;
  }

  // High humidity alerts (only for very high humidity)
  if (weatherData.current.humidity > 90) {
    alerts.push({
      title: "High Humidity Alert",
      description: `Very high humidity of ${weatherData.current.humidity}% may promote fungal diseases. Monitor crops closely.`,
      severity: "medium",
      valid_until: validUntil
    });
    hasAlerts = true;
  }

  // If no concerning conditions, return a single normal condition alert
  if (!hasAlerts) {
    return [{
      title: "Weather Conditions Normal",
      description: "Current weather conditions are suitable for your crops. Continue regular farming activities.",
      severity: "low",
      valid_until: validUntil
    }];
  }

  return alerts;
}

// Get weather data with AI-driven alerts
router.get('/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    
    // Get weather data
    const weatherData = mockWeatherData[farmerId];
    if (!weatherData) {
      return res.status(404).json({ error: 'Weather data not found for this farmer' });
    }

    // Get farmer data
    const farmersDataPath = path.join(__dirname, '../../farmers_data.json');
    const farmersData = JSON.parse(await fs.readFile(farmersDataPath, 'utf8'));
    const farmerData = farmersData.find(f => f.id === farmerId);
    
    if (!farmerData) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    // Generate AI-driven alerts
    const alerts = await generateAIWeatherAlerts(farmerData, weatherData);

    res.json({
      current: weatherData.current,
      forecast: weatherData.forecast,
      alerts: alerts
    });
  } catch (error) {
    console.error('Weather route error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get weather alerts for a specific location
router.get('/alerts/:location', async (req, res) => {
  try {
    const location = req.params.location;
    
    // Generate location-specific alerts
    const mockAlerts = [];
    
    if (location.toLowerCase().includes('guwahati') || location.toLowerCase().includes('kamrup')) {
      mockAlerts.push({
        title: 'Flood Warning',
        description: 'Heavy rainfall may cause flooding in low-lying areas.',
        severity: 'high',
        validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
      });
    }
    
    if (location.toLowerCase().includes('jorhat')) {
      mockAlerts.push({
        title: 'Storm Warning',
        description: 'Strong winds and thunderstorms expected.',
        severity: 'medium',
        validUntil: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()
      });
    }

    if (location.toLowerCase().includes('dibrugarh')) {
      mockAlerts.push({
        title: 'Heat Wave Alert',
        description: 'High temperatures expected. Ensure adequate irrigation.',
        severity: 'medium',
        validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
      });
    }
    
    res.json({ alerts: mockAlerts });
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    res.status(500).json({ error: 'Failed to fetch weather alerts' });
  }
});

// Get current weather conditions
router.get('/current/:location', async (req, res) => {
  try {
    const location = req.params.location;
    
    // Generate location-specific weather
    const currentWeather = {
      temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
      humidity: Math.floor(Math.random() * 30) + 60, // 60-90%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
      condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Overcast'][Math.floor(Math.random() * 4)]
    };
    
    res.json(currentWeather);
  } catch (error) {
    console.error('Error fetching current weather:', error);
    res.status(500).json({ error: 'Failed to fetch current weather' });
  }
});

// Translation endpoint (AI-powered, placeholder for now)
router.post('/api/translate', async (req, res) => {
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

module.exports = router; 