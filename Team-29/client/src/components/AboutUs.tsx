import React from 'react'
import { Users, Award, Building2, Phone, Mail, Calendar } from 'lucide-react'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-0">
      {/* About Us Section */}
      <section className="w-full mb-10 bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-center p-6 md:p-12">
        <div className="md:w-1/2 w-full p-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-green-800">About Us</h1>
          <p className="text-base md:text-lg text-justify leading-relaxed text-gray-800">
            The Centre for Microfinance & Livelihood (CML), initiated by Tata Trusts in 2008, is a support organization focused on capacity building,
            research, and policy advocacy in Northeast India. With a deep understanding of regional needs, CML designs inclusive, data-driven
            interventions in education, livelihood, WaSH, craft, and sports across Assam, Tripura, Manipur, and Meghalaya.
            Over the years, it has impacted 1 lakh+ beneficiaries through initiatives in fishing, horticulture, piggery, handloom, and handicrafts.
            CML's strategic focus includes Capacity Building, Knowledge Management, and Linkages, contributing to one of the largest NGO capacity
            building programs in India.
          </p>
        </div>
        <div className="md:w-1/2 w-full p-4 flex justify-center">
          <img src="/Banner-6-.jpg" alt="About us image" className="w-full max-w-xl h-auto md:h-[250px] rounded-lg shadow-md object-cover" />
        </div>
      </section>

      {/* Chairman Profile Section */}
      <section className="w-full mb-10 bg-white rounded-xl shadow-lg px-6 md:px-12 py-10">
        <div className="text-center md:text-left mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">Chairman Profile</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Chairman Card */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="bg-green-50 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 w-64">
              <img src="/cml_Ranjit_Barthakur.jpg" alt="Chairman Ranjit Barthakur" className="rounded-t-lg w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-900">Ranjit Barthakur</h2>
                <p className="text-sm text-gray-600 text-center">Chairman</p>
              </div>
            </div>
          </div>

          {/* Chairman Bio */}
          <div className="md:w-2/3 w-full p-4 space-y-4">
            <p className="text-base md:text-lg text-justify leading-relaxed text-gray-800">
              Ranjit Barthakur is a social entrepreneur, committed to pursuing social change through innovative cutting edge concepts, ecological neutrality and impactful action.
              He has pioneered the concepts of Naturenomics™ and Rural Futures, with a view to inspiring community-based conservation and livelihoods in the Eastern Himalayas.
              Though his journey began with ITC Mumbai, his heart and soul has always been in Assam.
              Partnering with Globally Managed Services & the Balipara Foundation, he gives back to the indigenous communities of the Eastern Himalayas via projects focused on
              strengthening ecological civilizations and building social mobility through natural capital.
            </p>

            <p className="text-base md:text-lg text-justify leading-relaxed text-gray-800">
              <span className="font-bold text-green-900">SOCIAL ENTREPRENEURSHIP & PROFESSIONAL EXPERIENCE</span><br />
              Under Ranjit Barthakur's mentorship as President of the Balipara Foundation, he has fostered conservation-based tourism and socio-ecological development in the Eastern Himalayas.
              Through strategic roles with Tata Trusts and various public-private partnerships, he advances initiatives in health, education, and livelihoods in Northeast India.<br />
              A visionary behind Naturenomics™ and Rural Futures, Ranjit has launched key forums, digital tools, and publications supporting ecological sustainability.<br />
              His 40+ years of leadership span private and public sectors, including roles as CEO of Hutchison Max-Touch, Chairman of Rajasthan Royals, and director at multiple organizations like Clearscore and Agilisys Asia.
              He also contributes to numerous nonprofits, promoting cultural preservation and inclusive development.
            </p>
          </div>
        </div>
      </section>

      {/* Board of Trustees Section */}
      <section className="w-full mb-10 bg-white rounded-xl shadow-lg px-6 md:px-12 py-10">
        <div className="text-center md:text-left mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">Board of Trustees</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Trustee 1 */}
          <div className="bg-green-50 rounded-lg shadow-md p-5 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Mr. Ranjit Barthakur</h3>
            <p className="text-sm text-gray-600 mb-1">Chairman — Independent</p>
            <p className="text-sm mb-2 text-gray-700">Ex Chairman, Amalgamated Plantations, Chairman, Multisport Pvt Ltd, Globally Managed Services, Balipara Foundation.</p>
            <div className="flex items-center gap-2 text-sm mb-1 text-gray-700">
              <Phone className="h-4 w-4" />
              <span>9820018180</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2 text-gray-700">
              <Mail className="h-4 w-4" />
              <span>ranjit.barthakur@tcs.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>01-Jan-2016 to 01-Jan-2026</span>
            </div>
          </div>

          {/* Trustee 2 */}
          <div className="bg-green-50 rounded-lg shadow-md p-5 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Mr. Ashish Deshpande</h3>
            <p className="text-sm text-gray-600 mb-1">Member — Tata Trusts Nominee</p>
            <p className="text-sm mb-2 text-gray-700">CFO and Company Secretary</p>
            <div className="flex items-center gap-2 text-sm mb-1 text-gray-700">
              <Phone className="h-4 w-4" />
              <span>9819718297</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2 text-gray-700">
              <Mail className="h-4 w-4" />
              <span>adeshpande@tatatrusts.org</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>05-Jun-2019 to 04-Jun-2025</span>
            </div>
          </div>

          {/* Trustee 3 */}
          <div className="bg-green-50 rounded-lg shadow-md p-5 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Mr. Dharani Ratno</h3>
            <p className="text-sm text-gray-600 mb-1">Member — Independent</p>
            <p className="text-sm mb-2 text-gray-700">Retired ED, NEIDA</p>
            <div className="flex items-center gap-2 text-sm mb-1 text-gray-700">
              <Phone className="h-4 w-4" />
              <span>9612934363</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2 text-gray-700">
              <Mail className="h-4 w-4" />
              <span>dharaniratno02@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>26-Sep-2020 to 25-Sep-2026</span>
            </div>
          </div>

          {/* Trustee 4 */}
          <div className="bg-green-50 rounded-lg shadow-md p-5 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Prof. Jahar Saha</h3>
            <p className="text-sm text-gray-600 mb-1">Member — Independent</p>
            <p className="text-sm mb-2 text-gray-700">Retired Professor, IIM Ahmedabad</p>
            <div className="flex items-center gap-2 text-sm mb-1 text-gray-700">
              <Phone className="h-4 w-4" />
              <span>9433074664</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2 text-gray-700">
              <Mail className="h-4 w-4" />
              <span>saha.jahar@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>20-Sep-2015 to 19-Sep-2025</span>
            </div>
          </div>

          {/* Trustee 5 */}
          <div className="bg-green-50 rounded-lg shadow-md p-5 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Mr. Ganesh Neelam</h3>
            <p className="text-sm text-gray-600 mb-1">Member — Tata Trusts Nominee</p>
            <p className="text-sm mb-2 text-gray-700">Zonal Head, Central and East, Tata Trusts</p>
            <div className="flex items-center gap-2 text-sm mb-1 text-gray-700">
              <Phone className="h-4 w-4" />
              <span>9819714618</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2 text-gray-700">
              <Mail className="h-4 w-4" />
              <span>gneelam@tatatrusts.org</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>30-Aug-2024 to 29-Aug-2027</span>
            </div>
          </div>

          {/* Trustee 6 */}
          <div className="bg-green-50 rounded-lg shadow-md p-5 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Ms. Amrita Patwardhan</h3>
            <p className="text-sm text-gray-600 mb-1">Member — Tata Trusts Nominee</p>
            <p className="text-sm mb-2 text-gray-700">Head Education, Tata Trusts</p>
            <div className="flex items-center gap-2 text-sm mb-1 text-gray-700">
              <Phone className="h-4 w-4" />
              <span>9810221330</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2 text-gray-700">
              <Mail className="h-4 w-4" />
              <span>amritapatwardhan@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>30-Aug-2024 to 29-Aug-2027</span>
            </div>
          </div>

          {/* Trustee 7 */}
          <div className="bg-green-50 rounded-lg shadow-md p-5 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Mr. S C Das</h3>
            <p className="text-sm text-gray-600 mb-1">Member — Independent</p>
            <p className="text-sm mb-2 text-gray-700">Ex Chairman ASEB, Retired Addl Chief Secretary, Govt of Assam, VC Skill University</p>
            <div className="flex items-center gap-2 text-sm mb-1 text-gray-700">
              <Phone className="h-4 w-4" />
              <span>9954944044</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-2 text-gray-700">
              <Mail className="h-4 w-4" />
              <span>subhashdas55@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>30-Aug-2024 to 29-Aug-2027</span>
            </div>
          </div>

          {/* Trustee 8 */}
          <div className="bg-green-50 rounded-lg shadow-md p-5 hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Ms. Monalisa Goswami</h3>
            <p className="text-sm text-gray-600 mb-1">Member — Independent</p>
            <p className="text-sm mb-2 text-gray-700">Commissioner & Secretary to Govt of Assam, Health, Handloom, Textile, Sericulture & Welfare of Minority Development</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs 