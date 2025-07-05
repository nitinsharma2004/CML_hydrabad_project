import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Farmers.css';

interface Farmer {
  phone: string; // Unique ID
  name: string;
  address: string;
  village: string;
  district: string;
  state: string;
  aadhaar: string;
  age: number;
  gender: string;
  education: string;
  landSize: number;
  crops: string[];
  income: number;
}

const initialFarmers: Farmer[] = [
  {
    phone: '+91 98765 43210',
    name: 'Rajesh Kumar',
    address: 'House No. 45, Main Street',
    village: 'Karnal',
    district: 'Karnal',
    state: 'Haryana',
    aadhaar: '1234-5678-9012',
    age: 45,
    gender: 'Male',
    education: 'Secondary',
    landSize: 8.5,
    crops: ['Rice', 'Wheat', 'Mustard'],
    income: 450000
  },
  {
    phone: '+91 87654 32109',
    name: 'Lakshmi Devi',
    address: 'Village Center, Near Temple',
    village: 'Anantapur',
    district: 'Anantapur',
    state: 'Andhra Pradesh',
    aadhaar: '2345-6789-0123',
    age: 38,
    gender: 'Female',
    education: 'Primary',
    landSize: 3.2,
    crops: ['Pulses', 'Vegetables'],
    income: 280000
  },
  {
    phone: '+91 76543 21098',
    name: 'Mohammed Ali',
    address: 'Farm House, Rural Road',
    village: 'Malappuram',
    district: 'Malappuram',
    state: 'Kerala',
    aadhaar: '3456-7890-1234',
    age: 52,
    gender: 'Male',
    education: 'Higher Secondary',
    landSize: 12.0,
    crops: ['Rice', 'Banana', 'Coconut'],
    income: 680000
  },
  {
    phone: '+91 65432 10987',
    name: 'Sunita Patel',
    address: 'Agricultural Colony',
    village: 'Vadodara',
    district: 'Vadodara',
    state: 'Gujarat',
    aadhaar: '4567-8901-2345',
    age: 41,
    gender: 'Female',
    education: 'Graduate',
    landSize: 6.8,
    crops: ['Cotton', 'Groundnut'],
    income: 520000
  },
  {
    phone: '+91 91234 56789',
    name: 'Asha Rani',
    address: 'Near School, Main Road',
    village: 'Barabanki',
    district: 'Barabanki',
    state: 'Uttar Pradesh',
    aadhaar: '5678-1234-9012',
    age: 36,
    gender: 'Female',
    education: 'Secondary',
    landSize: 4.5,
    crops: ['Wheat', 'Pulses'],
    income: 320000
  },
  {
    phone: '+91 99887 66554',
    name: 'Ramesh Singh',
    address: 'Plot No. 12, Village End',
    village: 'Sikar',
    district: 'Sikar',
    state: 'Rajasthan',
    aadhaar: '6789-0123-4567',
    age: 50,
    gender: 'Male',
    education: 'Primary',
    landSize: 10.0,
    crops: ['Mustard', 'Maize', 'Wheat'],
    income: 540000
  }
];

const getUnique = (arr: string[]) => Array.from(new Set(arr)).sort();

const Farmers: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>(initialFarmers);
  const [search, setSearch] = useState('');
  const [villageFilter, setVillageFilter] = useState<string[]>([]);
  const [districtFilter, setDistrictFilter] = useState<string[]>([]);
  const [cropFilter, setCropFilter] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Load new farmers from localStorage on component mount
  React.useEffect(() => {
    const newFarmers = JSON.parse(localStorage.getItem('newFarmers') || '[]');
    if (newFarmers.length > 0) {
      // Add new farmers to the existing list
      setFarmers(prevFarmers => {
        // Filter out any duplicates based on phone number
        const existingPhones = new Set(prevFarmers.map(f => f.phone));
        const uniqueNewFarmers = newFarmers.filter((f: Farmer) => !existingPhones.has(f.phone));
        return [...prevFarmers, ...uniqueNewFarmers];
      });
      // Clear the localStorage after adding the farmers
      localStorage.removeItem('newFarmers');
    }
  }, []);

  // Get unique filter options
  const villages = getUnique(farmers.map(f => f.village));
  const districts = getUnique(farmers.map(f => f.district));
  const crops = getUnique(farmers.flatMap(f => f.crops));

  // Filtering logic
  const filteredFarmers = farmers.filter(farmer => {
    // Search by name, phone, or aadhaar - make it more robust
    const searchTerm = search.toLowerCase().trim();
    const searchMatch = searchTerm === '' || 
      farmer.name.toLowerCase().includes(searchTerm) ||
      farmer.phone.replace(/\s+/g, '').toLowerCase().includes(searchTerm.replace(/\s+/g, '')) ||
      farmer.aadhaar.replace(/\s+/g, '').toLowerCase().includes(searchTerm.replace(/\s+/g, '')) ||
      farmer.village.toLowerCase().includes(searchTerm) ||
      farmer.district.toLowerCase().includes(searchTerm) ||
      farmer.state.toLowerCase().includes(searchTerm) ||
      farmer.crops.some(crop => crop.toLowerCase().includes(searchTerm));
    
    // Village filter
    const villageMatch = villageFilter.length === 0 || villageFilter.includes(farmer.village);
    // District filter
    const districtMatch = districtFilter.length === 0 || districtFilter.includes(farmer.district);
    // Crop filter (all selected crops must be present)
    const cropMatch = cropFilter.length === 0 || cropFilter.every(crop => farmer.crops.includes(crop));
    return searchMatch && villageMatch && districtMatch && cropMatch;
  });

  // Handle filter toggles
  const handleMultiToggle = (value: string, setFilter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setFilter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  // Close filter dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  return (
    <div className="farmers-container">
      <header className="farmers-header">
        <h1>Farmers</h1>
      </header>

      <div className="farmers-toolbar">
        <input
          type="text"
          placeholder="Search by name, phone, Aadhaar, village, district, state, or crops..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="farmer-search-input"
        />
        <div className="filter-dropdown-wrapper" ref={filterRef}>
          <button className="filter-dropdown-btn" onClick={() => setFilterOpen(f => !f)}>
            Filter &#x25BC;
          </button>
          {filterOpen && (
            <div className="filter-dropdown">
              <div className="filter-section">
                <div className="filter-label">Village</div>
                {villages.map(v => (
                  <label key={v} className="filter-checkbox-label">
                    <input
                      type="checkbox"
                      checked={villageFilter.includes(v)}
                      onChange={() => handleMultiToggle(v, setVillageFilter)}
                    />
                    {v}
                  </label>
                ))}
              </div>
              <div className="filter-section">
                <div className="filter-label">District</div>
                {districts.map(d => (
                  <label key={d} className="filter-checkbox-label">
                    <input
                      type="checkbox"
                      checked={districtFilter.includes(d)}
                      onChange={() => handleMultiToggle(d, setDistrictFilter)}
                    />
                    {d}
                  </label>
                ))}
              </div>
              <div className="filter-section">
                <div className="filter-label">Crops</div>
                {crops.map(crop => (
                  <label key={crop} className="filter-checkbox-label">
                    <input
                      type="checkbox"
                      checked={cropFilter.includes(crop)}
                      onChange={() => handleMultiToggle(crop, setCropFilter)}
                    />
                    {crop}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="enroll-section">
        <Link to="/enrollment" className="enroll-farmer-button">
          + Enroll New Farmer
        </Link>
      </div>

      <div className="farmers-list">
        <h2>Registered Farmers</h2>
        <div className="farmer-cards">
          {filteredFarmers.length === 0 && <div className="no-farmers">No farmers found.</div>}
          {filteredFarmers.map((farmer) => (
            <div className="farmer-card" key={farmer.phone}>
              <div className="farmer-info">
                <div className="farmer-avatar">
                  {farmer.name.charAt(0)}
                </div>
                <div className="farmer-details">
                  <div className="farmer-id">ID: {farmer.phone}</div>
                  <h3>{farmer.name}</h3>
                  <p className="farmer-address">
                    {farmer.address}, {farmer.village}
                  </p>
                  <p className="farmer-location">
                    {farmer.district}, {farmer.state}
                  </p>
                  <p className="farmer-phone">{farmer.phone}</p>
                </div>
              </div>
              <div className="farmer-stats">
                <div className="stat">
                  <span className="stat-label">Land Size:</span>
                  <span className="stat-value">{farmer.landSize} acres</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Crops:</span>
                  <span className="stat-value">{farmer.crops.join(', ')}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Income:</span>
                  <span className="stat-value">₹{farmer.income.toLocaleString()}</span>
                </div>
              </div>
              <div className="farmer-actions">
                <a href={`/farmer-profile/${encodeURIComponent(farmer.phone)}`} className="more-button">
                  More Details
                </a>
                <Link to={`/edit-farmer/${encodeURIComponent(farmer.phone)}`} className="edit-button">
                  Edit
                </Link>
                <button 
                  onClick={() => setFarmers(prev => prev.filter(f => f.phone !== farmer.phone))} 
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Farmers; 