const express = require('express');
const router = express.Router();

// Function to compute dropout rate (0-1) based on features (converted from Python)
function computeDropoutRate(data) {
  let rate = 0.1; // base rate

  // Attendance impact
  if (data.attendance_rate < 50) {
    rate += 0.5;
  } else if (data.attendance_rate < 70) {
    rate += 0.3;
  } else {
    rate -= 0.1;
  }

  // Skill impact
  if (data.initial_skill_score < 4) {
    rate += 0.2;
  } else if (data.initial_skill_score < 7) {
    rate += 0.1;
  } else {
    rate -= 0.05;
  }

  // Age impact
  if (data.age_group === '46+') {
    rate += 0.1;
  } else if (data.age_group === '36-45') {
    rate += 0.05;
  }

  // Marital & dependents impact
  if (data.marital_status_dependents.includes('3+')) {
    rate += 0.15;
  } else if (data.marital_status_dependents.includes('1-2')) {
    rate += 0.05;
  }

  // Household income impact
  if (data.household_income_status === 'Low_income_unemployed') {
    rate += 0.2;
  } else if (data.household_income_status === 'Low_income_employed') {
    rate += 0.1;
  } else if (data.household_income_status === 'High_income') {
    rate -= 0.1;
  }

  // Motivation impact
  if (data.motivation_level === 'Family_expectation') {
    rate += 0.2;
  } else if (data.motivation_level === 'Better_job_opportunity') {
    rate -= 0.1;
  } else if (data.motivation_level === 'Self_employment_goal') {
    rate -= 0.05;
  }

  // Clamp rate between 0 and 1
  return Math.max(0, Math.min(1, rate));
}

// Function to map skill score to feedback
function mapSkillToFeedback(skillScore) {
  if (skillScore >= 8) {
    return "Very Satisfied";
  } else if (skillScore >= 6) {
    return "Satisfied";
  } else if (skillScore >= 4) {
    return "Neutral";
  } else {
    return "Poor";
  }
}

// Function to convert feedback to dropout probability
function feedbackToDropoutProbability(feedback) {
  const mapping = {
    "Very Satisfied": 0.05,
    "Satisfied": 0.1,
    "Neutral": 0.3,
    "Poor": 0.6
  };
  return mapping[feedback] || 0.3;
}

// POST endpoint for dropout prediction
router.post('/predict-dropout', (req, res) => {
  try {
    const {
      attendance_rate,
      initial_skill_score,
      age_group,
      marital_status_dependents,
      household_income_status,
      motivation_level
    } = req.body;

    // Validate required fields
    if (!attendance_rate || !initial_skill_score || !age_group || 
        !marital_status_dependents || !household_income_status || !motivation_level) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: [
          'attendance_rate',
          'initial_skill_score', 
          'age_group',
          'marital_status_dependents',
          'household_income_status',
          'motivation_level'
        ]
      });
    }

    // Validate age_group
    const validAgeGroups = ['18-25', '26-35', '36-45', '46+'];
    if (!validAgeGroups.includes(age_group)) {
      return res.status(400).json({
        error: 'Invalid age_group',
        valid: validAgeGroups
      });
    }

    // Validate marital_status_dependents
    const validMaritalStatus = [
      'Single_no_dependents',
      'Married_no_dependents', 
      'Married_1-2_dependents',
      'Married_3+_dependents',
      'Widowed_or_Divorced'
    ];
    if (!validMaritalStatus.includes(marital_status_dependents)) {
      return res.status(400).json({
        error: 'Invalid marital_status_dependents',
        valid: validMaritalStatus
      });
    }

    // Validate household_income_status
    const validIncomeStatus = [
      'Low_income_unemployed',
      'Low_income_employed',
      'Medium_income',
      'High_income'
    ];
    if (!validIncomeStatus.includes(household_income_status)) {
      return res.status(400).json({
        error: 'Invalid household_income_status',
        valid: validIncomeStatus
      });
    }

    // Validate motivation_level
    const validMotivationLevels = [
      'Self_employment_goal',
      'Better_job_opportunity',
      'Family_expectation',
      'Personal_interest'
    ];
    if (!validMotivationLevels.includes(motivation_level)) {
      return res.status(400).json({
        error: 'Invalid motivation_level',
        valid: validMotivationLevels
      });
    }

    // Validate numeric fields
    if (typeof attendance_rate !== 'number' || attendance_rate < 0 || attendance_rate > 100) {
      return res.status(400).json({
        error: 'attendance_rate must be a number between 0 and 100'
      });
    }

    if (typeof initial_skill_score !== 'number' || initial_skill_score < 1 || initial_skill_score > 10) {
      return res.status(400).json({
        error: 'initial_skill_score must be a number between 1 and 10'
      });
    }

    // Calculate dropout rate
    const dropoutRate = computeDropoutRate({
      attendance_rate,
      initial_skill_score,
      age_group,
      marital_status_dependents,
      household_income_status,
      motivation_level
    });

    // Convert to binary prediction (dropout if rate > 0.5)
    const dropoutBinary = dropoutRate > 0.5 ? 1 : 0;

    // Get feedback based on skill score
    const feedbackClass = mapSkillToFeedback(initial_skill_score);
    const feedbackProb = feedbackToDropoutProbability(feedbackClass);

    // Combine model prediction with feedback (70% model, 30% feedback)
    const finalDropoutProb = (0.7 * dropoutRate) + (0.3 * feedbackProb);

    // Determine risk level
    let riskLevel = 'Low';
    if (finalDropoutProb >= 0.7) {
      riskLevel = 'High';
    } else if (finalDropoutProb >= 0.4) {
      riskLevel = 'Medium';
    }

    // Generate recommendations based on risk factors
    const recommendations = [];
    
    if (attendance_rate < 70) {
      recommendations.push('Improve attendance rate through better scheduling and support');
    }
    
    if (initial_skill_score < 6) {
      recommendations.push('Provide additional skill development training');
    }
    
    if (household_income_status === 'Low_income_unemployed') {
      recommendations.push('Offer financial support and employment assistance');
    }
    
    if (marital_status_dependents.includes('3+')) {
      recommendations.push('Provide childcare support and flexible training hours');
    }
    
    if (motivation_level === 'Family_expectation') {
      recommendations.push('Focus on personal development and career goals');
    }

    res.json({
      success: true,
      prediction: {
        dropout_rate: parseFloat(dropoutRate.toFixed(3)),
        dropout_binary: dropoutBinary,
        final_probability: parseFloat(finalDropoutProb.toFixed(3)),
        risk_level: riskLevel,
        feedback_class: feedbackClass,
        feedback_probability: feedbackProb
      },
      input_data: {
        attendance_rate,
        initial_skill_score,
        age_group,
        marital_status_dependents,
        household_income_status,
        motivation_level
      },
      recommendations,
      model_info: {
        description: 'Women empowerment program dropout prediction model',
        version: '1.0',
        algorithm: 'Rule-based prediction with feedback integration'
      }
    });

  } catch (error) {
    console.error('Error in dropout prediction:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// GET endpoint to get valid options for form fields
router.get('/valid-options', (req, res) => {
  res.json({
    age_groups: ['18-25', '26-35', '36-45', '46+'],
    marital_status_dependents: [
      'Single_no_dependents',
      'Married_no_dependents',
      'Married_1-2_dependents',
      'Married_3+_dependents',
      'Widowed_or_Divorced'
    ],
    household_income_status: [
      'Low_income_unemployed',
      'Low_income_employed',
      'Medium_income',
      'High_income'
    ],
    motivation_levels: [
      'Self_employment_goal',
      'Better_job_opportunity',
      'Family_expectation',
      'Personal_interest'
    ]
  });
});

// GET endpoint for health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Women Analytics API',
    version: '1.0'
  });
});

module.exports = router; 