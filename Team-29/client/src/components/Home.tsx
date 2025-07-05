import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Wheat, Heart, Users, TrendingDown, Menu, X } from "lucide-react";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stats = [
    { number: "70%", label: "of farmers live below poverty line", icon: TrendingDown },
    { number: "45%", label: "lack access to credit facilities", icon: Heart },
    { number: "600M", label: "smallholder farmers worldwide", icon: Users },
    { number: "80%", label: "of world's hungry are farmers", icon: Wheat }
  ];

  const stories = [
  {
    name: "Mitali Das",
    location: "Assam, India",
    story: "I used to work long hours for daily wages. With CML's pig-rearing training and support, I now earn enough to support my children and even mentor others in my village.",
    image: "https://cmlnortheast.com/wp-content/uploads/2018/12/Handloom-intervention-in-Mising-Autonomous-Council-areas-of-Assam-1-800x533.jpg"
  },
  {
    name: "Subham Lyngdoh",
    location: "Meghalaya, India",
    story: "My pepper plantation had almost died out. Thanks to CML's training and technical support, I revived it and now see good yields. But I still struggle to get real-time guidance due to poor connectivity.",
    image: "https://cmlnortheast.com/wp-content/uploads/2018/12/Horticulture-intervention-in-Dhemaji-and-Boko-Assam-1-800x533.jpg"
  },
  {
    name: "Anjali Tripura",
    location: "Tripura, India",
    story: "Through CML's women-led lemon farming workshops, I became a leader of a local farming group. We now grow and sell collectively, but tracking progress without digital tools is still tough.",
    image: "https://cmlnortheast.com/wp-content/uploads/2018/12/Handloom-intervention-in-Mising-Autonomous-Council-areas-of-Assam-2-e1545103214637-400x600.jpg"
  }
];


  const navigationItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Contact Us", href: "#contact" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Donations/Volunteering", href: "#donations" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-green-900/20 to-emerald-900/20 pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10 w-full px-6 text-center">
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg mb-8">
              <Wheat className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-800">Centre for Microfinance</h2>
                <p className="text-lg text-gray-600">& Livelihood (CML)</p>
              </div>
            </div> */}
            
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            Empowering Communities
            <span className="block text-green-700">Through Sustainable Development</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed"
            {...fadeInUp}
            transition={{ delay: 0.6 }}
          >
            An initiative of Tata Trusts, CML focuses on supporting the development sector in Northeast India 
            through capacity building, knowledge management, and facilitating linkages towards community 
            empowerment and improving quality of life.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            {...fadeInUp}
            transition={{ delay: 0.8 }}
          >
            <button 
              onClick={() => navigate('/donations')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              Support Our Mission
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4"
            {...fadeInUp}
          >
            Our Mission & Vision
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Building sustainable livelihoods and empowering communities across Northeast India
          </motion.p>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg border border-green-100"
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold text-green-800 mb-4">Our Focus Areas</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                CML works towards community empowerment through multi-thematic interventions in education, 
                water access, conservation, access and livelihood, policy and crafts and sports, with a 
                focus on the Northeastern states of India.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our current focus is on Livelihood interventions whose beneficiaries are predominantly women. 
                Within livelihood, we have various projects on horticulture, livestock, and crop cultivation.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg border border-green-100"
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold text-green-800 mb-4">Community Engagement</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                CML's field executive teams engage with tribal communities to identify areas of development 
                and establish trust with farmers to empower them in the identified areas.
              </p>
              <p className="text-gray-700 leading-relaxed">
                People of the communities are provided with trainings/workshops on horticulture and livestock 
                practices, with ongoing support throughout the lifecycle of projects.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-green-50 to-emerald-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4"
            {...fadeInUp}
          >
            The Challenge We Face
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Understanding the critical challenges in rural development and farmer welfare
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-lg border border-green-100"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stories Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4"
            {...fadeInUp}
          >
            Voices from the Field
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Real stories from farmers who face these challenges every day
          </motion.p>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stories.map((story, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl overflow-hidden border border-green-100"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${story.image})` }}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{story.name}</h3>
                  <p className="text-green-600 font-semibold mb-4">{story.location}</p>
                  <p className="text-gray-600 leading-relaxed italic">"{story.story}"</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Current Challenges Section */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-green-50 to-emerald-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            {...fadeInUp}
          >
            Current Challenges
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            CML faces critical challenges in terms of holistic tracking of projects, manual data entry 
            and analytics of their multiple projects which leads to inefficient and dissipated inflow 
            of information to and from the beneficiaries, regional language barrier, and capturing 
            feedback from communities who have limited access to technology.
          </motion.p>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-green-700 to-emerald-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            {...fadeInUp}
          >
            Join Us in Making a Difference
          </motion.h2>
          <motion.p
            className="text-xl text-green-100 mb-8 leading-relaxed"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Through microfinance and livelihood support, we can empower farmers and communities to build sustainable futures 
            for themselves and their families. Every contribution makes a difference.
          </motion.p>
          <motion.div
            className="flex justify-center"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={() => navigate('/donations')}
              className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              Make a Donation
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-800 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Wheat className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-2xl font-bold">Centre for Microfinance & Livelihood</h3>
              <p className="text-gray-400">An initiative of Tata Trusts</p>
            </div>
          </div>
          <p className="text-gray-400">©️ 2024 CML. All rights reserved. Empowering communities, transforming lives.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;