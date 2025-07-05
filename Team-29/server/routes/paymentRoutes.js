const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getPaymentHistory } = require('../controllers/paymentController');
const razorpayInstance = require('../config/razorpay');

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/getkey', (req, res) => {
    const key_id = process.env.RAZORPAY_KEY_ID;
    if (!key_id) {
        return res.status(500).json({ error: 'Razorpay key not configured' });
    }
    console.log('Fetching Razorpay key:', key_id);
    res.status(200).json({ key: key_id });
});

router.get('/history', getPaymentHistory);

module.exports = router; 