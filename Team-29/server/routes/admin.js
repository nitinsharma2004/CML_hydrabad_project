const express = require('express');
const router = express.Router();

// Admin Dashboard Analytics
router.get('/dashboard', async (req, res) => {
  try {
    // In a real application, you would fetch this data from your database
    // For now, we'll return mock data that can be updated later
    
    const dashboardData = {
      visitorsCount: 48294,
      
      totalDonations: [
        { month: "Jan", amount: 1200 },
        { month: "Feb", amount: 1500 },
        { month: "Mar", amount: 1800 },
        { month: "Apr", amount: 2000 },
        { month: "May", amount: 2200 },
        { month: "Jun", amount: 2500 }
      ],
      
      volunteerActivity: [
        { month: "Jan", count: 30 },
        { month: "Feb", count: 45 },
        { month: "Mar", count: 40 },
        { month: "Apr", count: 55 },
        { month: "May", count: 60 },
        { month: "Jun", count: 70 }
      ],
      
      farmersEnrolled: [
        { month: "Jan", count: 100 },
        { month: "Feb", count: 250 },
        { month: "Mar", count: 400 },
        { month: "Apr", count: 600 },
        { month: "May", count: 850 },
        { month: "Jun", count: 1100 }
      ],
      
      impactData: [
        { month: "Jan", value: 10 },
        { month: "Feb", value: 25 },
        { month: "Mar", value: 45 },
        { month: "Apr", value: 70 },
        { month: "May", value: 90 },
        { month: "Jun", value: 95 }
      ]
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch dashboard data',
      message: error.message 
    });
  }
});

// Get all farmers data for admin
router.get('/farmers', async (req, res) => {
  try {
    // In a real application, you would fetch this from your database
    // For now, we'll return the farmers data from the JSON file
    const farmersData = require('../farmers_data.json');
    res.json(farmersData);
  } catch (error) {
    console.error('Error fetching farmers data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch farmers data',
      message: error.message 
    });
  }
});

// Get donation statistics
router.get('/donations', async (req, res) => {
  try {
    // In a real application, you would fetch this from your database
    const donationStats = {
      totalAmount: 12000,
      totalDonations: 48,
      monthlyBreakdown: [
        { month: "Jan", amount: 1200, count: 8 },
        { month: "Feb", amount: 1500, count: 10 },
        { month: "Mar", amount: 1800, count: 12 },
        { month: "Apr", amount: 2000, count: 15 },
        { month: "May", amount: 2200, count: 18 },
        { month: "Jun", amount: 2500, count: 20 }
      ]
    };
    
    res.json(donationStats);
  } catch (error) {
    console.error('Error fetching donation statistics:', error);
    res.status(500).json({ 
      error: 'Failed to fetch donation statistics',
      message: error.message 
    });
  }
});

module.exports = router; 