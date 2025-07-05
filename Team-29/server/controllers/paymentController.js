const razorpayInstance = require('../config/razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');

exports.createOrder = async (req, res) => {
  try {
    const { amount, tag } = req.body;
    console.log('Creating order with amount:', amount, 'and tag:', tag);

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid amount provided');
    }

    // Validate tag (optional but safer)
    const allowedTags = ['fertilizers', 'disasters', 'tools', 'others'];
    if (tag && !allowedTags.includes(tag)) {
      throw new Error('Invalid tag provided');
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    console.log('Order created successfully:', order);

    // Save order to DB with tag
    await Payment.create({
      razorpay_order_id: order.id,
      amount: amount,
      currency: order.currency,
      status: 'created',
      tags: tag || undefined, // Set only if tag is provided
    });

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log('Verifying payment:', { razorpay_order_id, razorpay_payment_id });

    // Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error('Missing payment details');
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Update payment status in database
      const updatedPayment = await Payment.findOneAndUpdate(
        { razorpay_order_id },
        {
          razorpay_payment_id,
          razorpay_signature,
          status: 'verified',
        },
        { new: true }
      );

      if (!updatedPayment) {
        throw new Error('Payment record not found');
      }

      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      // Update payment status to failed
      await Payment.findOneAndUpdate(
        { razorpay_order_id },
        { status: 'failed' },
        { new: true }
      );

      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error.message);
    res.status(500).json({ success: false, error: 'Error verifying payment' });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error('Error fetching payment history:', error.message);
    res.status(500).json({ success: false, error: 'Error fetching payment history' });
  }
}; 