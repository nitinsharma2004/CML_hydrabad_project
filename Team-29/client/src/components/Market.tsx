import React from "react";
import { motion } from "framer-motion";
import { Search, Wheat, MapPin, Phone, Star, ShoppingCart, Heart, Truck, Clock, Users } from "lucide-react";
import { useState } from "react";

// Enhanced crop data with farmer information
const cropData = [
  { 
    name: "Rice", 
    assamPrice: 35, 
    tripuraPrice: 38, 
    unit: "per kg",
    assamFarmer: "Rajesh Gogoi",
    tripuraFarmer: "Mitali Debbarma",
    assamLocation: "Jorhat, Assam",
    tripuraLocation: "Agartala, Tripura",
    assamPhone: "+91 98765-43210",
    tripuraPhone: "+91 98765-43211",
    assamRating: 4.8,
    tripuraRating: 4.6,
    assamStock: "500 kg available",
    tripuraStock: "300 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Next day delivery",
    assamImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop"
  },
  { 
    name: "Mustard Seed", 
    assamPrice: 60, 
    tripuraPrice: 62, 
    unit: "per kg",
    assamFarmer: "Bikash Saikia",
    tripuraFarmer: "Priya Das",
    assamLocation: "Dibrugarh, Assam",
    tripuraLocation: "Udaipur, Tripura",
    assamPhone: "+91 98765-43212",
    tripuraPhone: "+91 98765-43213",
    assamRating: 4.9,
    tripuraRating: 4.7,
    assamStock: "200 kg available",
    tripuraStock: "150 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Same day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Tea", 
    assamPrice: 200, 
    tripuraPrice: 210, 
    unit: "per kg",
    assamFarmer: "Anita Baruah",
    tripuraFarmer: "Rahul Chakma",
    assamLocation: "Tezpur, Assam",
    tripuraLocation: "Kailashahar, Tripura",
    assamPhone: "+91 98765-43214",
    tripuraPhone: "+91 98765-43215",
    assamRating: 4.9,
    tripuraRating: 4.8,
    assamStock: "100 kg available",
    tripuraStock: "80 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Next day delivery",
    assamImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop"
  },
  { 
    name: "Wheat", 
    assamPrice: 25, 
    tripuraPrice: 27, 
    unit: "per kg",
    assamFarmer: "Hiren Kalita",
    tripuraFarmer: "Sita Reang",
    assamLocation: "Nagaon, Assam",
    tripuraLocation: "Dharmanagar, Tripura",
    assamPhone: "+91 98765-43216",
    tripuraPhone: "+91 98765-43217",
    assamRating: 4.7,
    tripuraRating: 4.5,
    assamStock: "800 kg available",
    tripuraStock: "600 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Same day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Pulses", 
    assamPrice: 80, 
    tripuraPrice: 85, 
    unit: "per kg",
    assamFarmer: "Manoj Bora",
    tripuraFarmer: "Lakshmi Jamatia",
    assamLocation: "Sivasagar, Assam",
    tripuraLocation: "Belonia, Tripura",
    assamPhone: "+91 98765-43218",
    tripuraPhone: "+91 98765-43219",
    assamRating: 4.6,
    tripuraRating: 4.4,
    assamStock: "300 kg available",
    tripuraStock: "250 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Next day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Oilseeds", 
    assamPrice: 55, 
    tripuraPrice: 58, 
    unit: "per kg",
    assamFarmer: "Pranab Hazarika",
    tripuraFarmer: "Maya Tripura",
    assamLocation: "Lakhimpur, Assam",
    tripuraLocation: "Sabroom, Tripura",
    assamPhone: "+91 98765-43220",
    tripuraPhone: "+91 98765-43221",
    assamRating: 4.8,
    tripuraRating: 4.6,
    assamStock: "400 kg available",
    tripuraStock: "350 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Same day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Jute", 
    assamPrice: 45, 
    tripuraPrice: 47, 
    unit: "per kg",
    assamFarmer: "Rupam Dutta",
    tripuraFarmer: "Anjali Debbarma",
    assamLocation: "Goalpara, Assam",
    tripuraLocation: "Khowai, Tripura",
    assamPhone: "+91 98765-43222",
    tripuraPhone: "+91 98765-43223",
    assamRating: 4.5,
    tripuraRating: 4.3,
    assamStock: "600 kg available",
    tripuraStock: "500 kg available",
    assamDelivery: "Next day delivery",
    tripuraDelivery: "Next day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Mesta", 
    assamPrice: 40, 
    tripuraPrice: 42, 
    unit: "per kg",
    assamFarmer: "Dilip Sarma",
    tripuraFarmer: "Rina Chakma",
    assamLocation: "Barpeta, Assam",
    tripuraLocation: "Teliamura, Tripura",
    assamPhone: "+91 98765-43224",
    tripuraPhone: "+91 98765-43225",
    assamRating: 4.4,
    tripuraRating: 4.2,
    assamStock: "700 kg available",
    tripuraStock: "550 kg available",
    assamDelivery: "Next day delivery",
    tripuraDelivery: "Next day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Sugarcane", 
    assamPrice: 3, 
    tripuraPrice: 3.2, 
    unit: "per kg",
    assamFarmer: "Nabin Deka",
    tripuraFarmer: "Purnima Jamatia",
    assamLocation: "Kamrup, Assam",
    tripuraLocation: "Amarpur, Tripura",
    assamPhone: "+91 98765-43226",
    tripuraPhone: "+91 98765-43227",
    assamRating: 4.7,
    tripuraRating: 4.5,
    assamStock: "2000 kg available",
    tripuraStock: "1800 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Same day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Potato", 
    assamPrice: 20, 
    tripuraPrice: 22, 
    unit: "per kg",
    assamFarmer: "Bhabesh Bora",
    tripuraFarmer: "Sunita Debbarma",
    assamLocation: "Darrang, Assam",
    tripuraLocation: "Santirbazar, Tripura",
    assamPhone: "+91 98765-43228",
    tripuraPhone: "+91 98765-43229",
    assamRating: 4.6,
    tripuraRating: 4.4,
    assamStock: "1000 kg available",
    tripuraStock: "900 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Same day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Banana", 
    assamPrice: 10, 
    tripuraPrice: 12, 
    unit: "per kg",
    assamFarmer: "Ranjit Gogoi",
    tripuraFarmer: "Mina Tripura",
    assamLocation: "Tinsukia, Assam",
    tripuraLocation: "Jampuijala, Tripura",
    assamPhone: "+91 98765-43230",
    tripuraPhone: "+91 98765-43231",
    assamRating: 4.8,
    tripuraRating: 4.6,
    assamStock: "1500 kg available",
    tripuraStock: "1200 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Same day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Arecanut", 
    assamPrice: 300, 
    tripuraPrice: 310, 
    unit: "per kg",
    assamFarmer: "Himangshu Saikia",
    tripuraFarmer: "Lakshmi Reang",
    assamLocation: "Karbi Anglong, Assam",
    tripuraLocation: "Panisagar, Tripura",
    assamPhone: "+91 98765-43232",
    tripuraPhone: "+91 98765-43233",
    assamRating: 4.9,
    tripuraRating: 4.7,
    assamStock: "100 kg available",
    tripuraStock: "80 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Next day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Maize", 
    assamPrice: 22, 
    tripuraPrice: 24, 
    unit: "per kg",
    assamFarmer: "Pradip Kalita",
    tripuraFarmer: "Rita Chakma",
    assamLocation: "Dhemaji, Assam",
    tripuraLocation: "Kumarghat, Tripura",
    assamPhone: "+91 98765-43234",
    tripuraPhone: "+91 98765-43235",
    assamRating: 4.5,
    tripuraRating: 4.3,
    assamStock: "900 kg available",
    tripuraStock: "750 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Same day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  { 
    name: "Chillies", 
    assamPrice: 150, 
    tripuraPrice: 160, 
    unit: "per kg",
    assamFarmer: "Bikash Bora",
    tripuraFarmer: "Anita Debbarma",
    assamLocation: "Sivasagar, Assam",
    tripuraLocation: "Ambassa, Tripura",
    assamPhone: "+91 98765-43236",
    tripuraPhone: "+91 98765-43237",
    assamRating: 4.8,
    tripuraRating: 4.6,
    assamStock: "200 kg available",
    tripuraStock: "180 kg available",
    assamDelivery: "Same day delivery",
    tripuraDelivery: "Same day delivery",
    assamImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    tripuraImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  }
];

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCrops, setFilteredCrops] = useState(cropData);
  const [selectedState, setSelectedState] = useState<"all" | "assam" | "tripura">("all");

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterCrops(term, selectedState);
  };

  const handleStateFilter = (state: "all" | "assam" | "tripura") => {
    setSelectedState(state);
    filterCrops(searchTerm, state);
  };

  const filterCrops = (term: string, state: "all" | "assam" | "tripura") => {
    let filtered = cropData.filter((crop) =>
      crop.name.toLowerCase().includes(term)
    );
    setFilteredCrops(filtered);
  };

  const handleContact = (phone: string, farmerName: string) => {
    alert(`Contacting ${farmerName} at ${phone}`);
  };

  const handleAddToCart = (cropName: string, farmerName: string, price: number) => {
    alert(`Added ${cropName} from ${farmerName} at ₹${price} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 py-8">
      {/* Header Section */}
      <motion.section
        className="w-full px-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="text-center mb-8" {...fadeInUp}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wheat className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Direct Farm Market
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect directly with farmers in Assam and Tripura. Get fresh produce at competitive prices with real-time market updates.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="flex flex-col lg:flex-row gap-4 justify-center items-center mb-8"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for crops (e.g., Rice, Tea, Mustard)"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-6 py-4 text-lg text-gray-700 bg-white rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-600 shadow-lg"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-green-600" />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleStateFilter("all")}
              className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                selectedState === "all"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-green-200 hover:bg-green-50"
              }`}
            >
              All States
            </button>
            <button
              onClick={() => handleStateFilter("assam")}
              className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                selectedState === "assam"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-green-200 hover:bg-green-50"
              }`}
            >
              Assam
            </button>
            <button
              onClick={() => handleStateFilter("tripura")}
              className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                selectedState === "tripura"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-green-200 hover:bg-green-50"
              }`}
            >
              Tripura
            </button>
          </div>
        </motion.div>
      </motion.section>

      {/* Market Cards Section */}
      <motion.section
        className="w-full px-6"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {filteredCrops.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCrops.map((crop, index) => (
              <div key={index} className="space-y-6">
                {/* Assam Farmer Card */}
                <motion.div
                  className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${crop.assamImage})` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Assam
                    </div>
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {crop.assamRating}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{crop.name}</h3>
                        <p className="text-3xl font-bold text-green-600">₹{crop.assamPrice} <span className="text-sm text-gray-500">{crop.unit}</span></p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{crop.assamFarmer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{crop.assamLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{crop.assamPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="w-4 h-4" />
                        <span>{crop.assamDelivery}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{crop.assamStock}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleContact(crop.assamPhone, crop.assamFarmer)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Contact
                      </button>
                      <button
                        onClick={() => handleAddToCart(crop.name, crop.assamFarmer, crop.assamPrice)}
                        className="flex-1 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Tripura Farmer Card */}
                <motion.div
                  className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${crop.tripuraImage})` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Tripura
                    </div>
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {crop.tripuraRating}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{crop.name}</h3>
                        <p className="text-3xl font-bold text-blue-600">₹{crop.tripuraPrice} <span className="text-sm text-gray-500">{crop.unit}</span></p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{crop.tripuraFarmer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{crop.tripuraLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{crop.tripuraPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="w-4 h-4" />
                        <span>{crop.tripuraDelivery}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{crop.tripuraStock}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleContact(crop.tripuraPhone, crop.tripuraFarmer)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Contact
                      </button>
                      <button
                        onClick={() => handleAddToCart(crop.name, crop.tripuraFarmer, crop.tripuraPrice)}
                        className="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            {...fadeInUp}
          >
            <Wheat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No crops found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
};

export default Market; 