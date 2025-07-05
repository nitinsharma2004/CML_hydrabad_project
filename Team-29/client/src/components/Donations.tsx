import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// Razorpay type declaration (minimal)
declare global {
  interface Window {
    Razorpay: any;
  }
}

const THEME = {
  btnBg: "#3399cc",
  btnHover: "#287aa3",
  cardBg: "#fff",
  cardRadius: "16px",
  cardShadow: "0 4px 14px rgba(0,0,0,0.1)",
  accent: "#f97316",
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

type Payment = {
  _id: string;
  razorpay_order_id: string;
  amount: number;
  tags: string;
  createdAt: string;
};

const Donations = () => {
  const [amount, setAmount] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [refresh, setRefresh] = useState(false);

  const tagOptions = ['fertilizers', 'disasters', 'tools', 'others'];
  const API_BASE_URL = 'https://backend-7sqr.onrender.com';

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/payment/history`);
      setPayments(data.payments || []);
    } catch (error) {
      console.error('Failed to fetch payment history:', error);
      toast.error('Failed to fetch payment history');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value);

  const handlePayment = async () => {
    const price = Number(amount);
    if (!price || isNaN(price) || price <= 0) return toast.error('Enter valid amount');
    if (!tag) return toast.error('Select a tag');

    try {
      setLoading(true);
      
      // Get Razorpay key
      const { data: { key } } = await axios.get(`${API_BASE_URL}/api/payment/getkey`);
      
      // Create order
      const { data: { order } } = await axios.post(`${API_BASE_URL}/api/payment/create-order`, { 
        amount: price, 
        tag 
      });

      const options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: 'CML Donation',
        description: `Donation for ${tag}`,
        image: 'https://cmlnortheast.com/wp-content/uploads/2018/05/CML-Logo-black-text-2.png',
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyResponse = await axios.post(`${API_BASE_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success(verifyResponse.data.message || 'Donation successful!');
            setAmount('');
            setTag('');
            setRefresh(!refresh);
          } catch (error: any) {
            console.error('Payment verification failed:', error);
            toast.error(error.response?.data?.message || 'Verification failed');
          }
        },
        theme: { color: THEME.btnBg },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (res: any) => {
        console.error('Payment failed:', res);
        toast.error(`Payment failed: ${res.error.description}`);
      });
      razorpay.open();
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      toast.error(error.response?.data?.error || error.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [refresh]);

  useEffect(() => {
    if (!document.getElementById('razorpay-checkout-js')) {
      const script = document.createElement('script');
      script.id = 'razorpay-checkout-js';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Chart data
  const lineData = payments.map(p => ({
    date: new Date(p.createdAt).toLocaleDateString(),
    amount: p.amount,
  }));

  const pieData = tagOptions.map(tag => ({
    name: tag,
    value: payments.filter(p => p.tags === tag).length,
  })).filter(p => p.value > 0);

  return (
    <div style={{ padding: 32, background: '#f9fafb', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Donor Info Card */}
      <div style={{
        display: 'flex', alignItems: 'center', background: THEME.cardBg, padding: 24,
        borderRadius: THEME.cardRadius, boxShadow: THEME.cardShadow, marginBottom: 32
      }}>
        <img src="https://cmlnortheast.com/wp-content/uploads/2018/05/CML-Logo-black-text-2.png" alt="CML Logo"
          style={{ width: 64, height: 64, borderRadius: '8px', marginRight: 24 }} />
        <div>
          <h2 style={{ margin: 0, color: '#0f8f4f' }}>Centre for Microfinance & Livelihood</h2>
          <p style={{ margin: '4px 0', color: '#666' }}>Supporting Farmers in Assam & Tripura</p>
          <p style={{ margin: 0, color: '#666' }}>Make a difference in agricultural communities</p>
        </div>
      </div>

      {/* Dashboard Layout */}
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {/* Left: Form + History */}
        <div style={{ flex: 1, minWidth: 350 }}>
          {/* Payment Form */}
          <div style={{
            background: THEME.cardBg, borderRadius: THEME.cardRadius, boxShadow: THEME.cardShadow,
            padding: '2rem', marginBottom: 32
          }}>
            <h3 style={{ color: '#0f8f4f', marginBottom: '1.5rem' }}>Make a Donation</h3>
            <select value={tag} onChange={e => setTag(e.target.value)} style={selectStyle}>
              <option value="">Select Category</option>
              {tagOptions.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
            <input type="number" placeholder="Amount (INR)" value={amount}
              onChange={handleInputChange} min="1" style={inputStyle} />
            <button onClick={handlePayment} disabled={loading || !tag}
              style={{ ...buttonStyle, background: loading ? '#ccc' : THEME.btnBg }}>
              {loading ? 'Processing...' : 'Donate Now'}
            </button>
          </div>

          {/* Payment Table */}
          <div style={{
            background: THEME.cardBg, borderRadius: THEME.cardRadius,
            boxShadow: THEME.cardShadow, padding: '1.5rem', maxHeight: 400, overflowY: 'auto'
          }}>
            <h3 style={{ color: '#0f8f4f', marginBottom: '1rem' }}>Payment History</h3>
            {payments.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center' }}>No payments yet. Be the first to donate!</p>
            ) : (
              <table style={{ width: '100%', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Order ID</th>
                    <th style={thStyle}>Amount</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p._id}>
                      <td style={tdStyle}>{p.razorpay_order_id.slice(0, 10)}...</td>
                      <td style={tdStyle}>₹{p.amount}</td>
                      <td style={tdStyle}>{p.tags}</td>
                      <td style={tdStyle}>{new Date(p.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right: Charts */}
        <div style={{ flex: 1, minWidth: 400 }}>
          {/* Line Chart */}
          <div style={{ background: THEME.cardBg, padding: 24, borderRadius: THEME.cardRadius, boxShadow: THEME.cardShadow, marginBottom: 32 }}>
            <h3 style={{ color: '#0f8f4f', marginBottom: '1rem' }}>Donation Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke={THEME.accent} strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={{ background: THEME.cardBg, padding: 24, borderRadius: THEME.cardRadius, boxShadow: THEME.cardShadow }}>
            <h3 style={{ color: '#0f8f4f', marginBottom: '1rem' }}>Donations by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 12,
  marginBottom: 16,
  borderRadius: 8,
  border: '2px solid #e0e0e0',
  fontSize: 16,
  transition: 'border-color 0.3s ease',
};

const selectStyle: React.CSSProperties = { 
  ...inputStyle,
  cursor: 'pointer'
};

const buttonStyle: React.CSSProperties = {
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '14px',
  fontSize: 16,
  fontWeight: 600,
  width: '100%',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const thStyle: React.CSSProperties = { 
  textAlign: 'left', 
  padding: 12, 
  background: '#f8f9fa',
  borderBottom: '2px solid #e9ecef',
  fontWeight: 600,
  color: '#333'
};

const tdStyle: React.CSSProperties = { 
  padding: 12, 
  borderBottom: '1px solid #eee',
  color: '#666'
};

export default Donations; 