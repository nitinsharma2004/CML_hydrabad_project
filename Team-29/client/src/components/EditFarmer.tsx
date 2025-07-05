import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FarmerEnrollment.css';

interface Farmer {
  id: string;
  name: string;
  address: string;
  village: string;
  district: string;
  state: string;
  phone: string;
  aadhaar: string;
  age: number;
  gender: string;
  education: string;
  landSize: number;
  crops: string[];
  income: number;
}

// Mock farmer data - in a real app, this would come from an API
const mockFarmers: Record<string, Farmer> = {
  '+91 98765 43210': {
    id: '+91 98765 43210',
    name: 'Rajesh Kumar',
    address: 'House No. 45, Main Street',
    village: 'Karnal',
    district: 'Karnal',
    state: 'Haryana',
    phone: '+91 98765 43210',
    aadhaar: '1234-5678-9012',
    age: 45,
    gender: 'Male',
    education: 'Secondary',
    landSize: 8.5,
    crops: ['Rice', 'Wheat', 'Mustard'],
    income: 450000
  },
  '+91 87654 32109': {
    id: '+91 87654 32109',
    name: 'Lakshmi Devi',
    address: 'Village Center, Near Temple',
    village: 'Anantapur',
    district: 'Anantapur',
    state: 'Andhra Pradesh',
    phone: '+91 87654 32109',
    aadhaar: '2345-6789-0123',
    age: 38,
    gender: 'Female',
    education: 'Primary',
    landSize: 3.2,
    crops: ['Pulses', 'Vegetables'],
    income: 280000
  },
  '+91 76543 21098': {
    id: '+91 76543 21098',
    name: 'Mohammed Ali',
    address: 'Farm House, Rural Road',
    village: 'Malappuram',
    district: 'Malappuram',
    state: 'Kerala',
    phone: '+91 76543 21098',
    aadhaar: '3456-7890-1234',
    age: 52,
    gender: 'Male',
    education: 'Higher Secondary',
    landSize: 12.0,
    crops: ['Rice', 'Banana', 'Coconut'],
    income: 680000
  },
  '+91 65432 10987': {
    id: '+91 65432 10987',
    name: 'Sunita Patel',
    address: 'Agricultural Colony',
    village: 'Vadodara',
    district: 'Vadodara',
    state: 'Gujarat',
    phone: '+91 65432 10987',
    aadhaar: '4567-8901-2345',
    age: 41,
    gender: 'Female',
    education: 'Graduate',
    landSize: 6.8,
    crops: ['Cotton', 'Groundnut'],
    income: 520000
  },
  '+91 91234 56789': {
    id: '+91 91234 56789',
    name: 'Asha Rani',
    address: 'Near School, Main Road',
    village: 'Barabanki',
    district: 'Barabanki',
    state: 'Uttar Pradesh',
    phone: '+91 91234 56789',
    aadhaar: '5678-1234-9012',
    age: 36,
    gender: 'Female',
    education: 'Secondary',
    landSize: 4.5,
    crops: ['Wheat', 'Pulses'],
    income: 320000
  },
  '+91 99887 66554': {
    id: '+91 99887 66554',
    name: 'Ramesh Singh',
    address: 'Plot No. 12, Village End',
    village: 'Sikar',
    district: 'Sikar',
    state: 'Rajasthan',
    phone: '+91 99887 66554',
    aadhaar: '6789-0123-4567',
    age: 50,
    gender: 'Male',
    education: 'Primary',
    landSize: 10.0,
    crops: ['Mustard', 'Maize', 'Wheat'],
    income: 540000
  }
};

const EditFarmer: React.FC = () => {
  const { phone } = useParams<{ phone: string }>();
  const navigate = useNavigate();
  
  // Decode the URL parameter to handle special characters
  const decodedPhone = phone ? decodeURIComponent(phone) : '';
  const mockFarmer = mockFarmers[decodedPhone];

  if (!mockFarmer) {
    return (
      <div className="enrollment-container">
        <div className="error-message">
          <h2>Farmer not found</h2>
          <p>Farmer with ID: {decodedPhone} could not be found.</p>
          <button onClick={() => navigate('/farmers')} className="btn-secondary">
            Back to Farmers
          </button>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    fullName: mockFarmer.name,
    gender: mockFarmer.gender,
    age: mockFarmer.age.toString(),
    dateOfBirth: '',
    phoneNumber: mockFarmer.phone,
    aadhaarNumber: mockFarmer.aadhaar,
    address: mockFarmer.address,
    village: mockFarmer.village,
    district: mockFarmer.district,
    state: mockFarmer.state,
    educationLevel: mockFarmer.education,
    landSize: mockFarmer.landSize.toString(),
    crops: mockFarmer.crops,
    income: mockFarmer.income.toString()
  });

  const cropOptions = ['Rice', 'Wheat', 'Mustard', 'Pulses', 'Vegetables', 'Cotton', 'Groundnut', 'Banana', 'Coconut', 'Maize', 'Jute'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCropChange = (crop: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      crops: checked 
        ? [...prev.crops, crop]
        : prev.crops.filter(c => c !== crop)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the farmer data in your backend
    console.log('Updated Farmer Data:', formData);
    alert('Farmer profile updated successfully!');
    navigate('/farmers');
  };

  const handleCancel = () => {
    navigate('/farmers');
  };

  return (
    <div className="enrollment-container">
      <div className="enrollment-header">
        <h1>Edit Farmer Profile</h1>
        <div className="step-indicator">
          <div className="step active">Edit Farmer Information</div>
        </div>
      </div>

      <div className="enrollment-content">
        <form onSubmit={handleSubmit}>
          <div className="enrollment-step">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Aadhaar Number *</label>
                <input
                  type="text"
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Village *</label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => handleInputChange('village', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>District *</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Education Level *</label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                  required
                >
                  <option value="">Select Education Level</option>
                  <option value="None">None</option>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Higher Secondary">Higher Secondary</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="enrollment-step">
            <h2>Agricultural Information</h2>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Crops Currently Grown *</label>
                <div className="checkbox-group">
                  {cropOptions.map(crop => (
                    <label key={crop} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.crops.includes(crop)}
                        onChange={(e) => handleCropChange(crop, e.target.checked)}
                      />
                      {crop}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Land Size (in acres) *</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.landSize}
                  onChange={(e) => handleInputChange('landSize', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Agricultural Income (₹) *</label>
                <input
                  type="number"
                  value={formData.income}
                  onChange={(e) => handleInputChange('income', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="enrollment-actions">
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFarmer; 