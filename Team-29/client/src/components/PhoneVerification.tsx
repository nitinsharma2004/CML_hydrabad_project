import React, { useState } from 'react';
import { Phone, Lock, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import './PhoneVerification.css';

interface PhoneVerificationProps {
  onVerificationSuccess: (phoneNumber: string) => void;
  onCancel: () => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({ onVerificationSuccess, onCancel }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Dummy farmer phone numbers for testing
  const validPhoneNumbers = [
    '9876543210', // Ramesh Das
    '9876543211', // Another farmer
    '9876543212', // Another farmer
  ];

  // Dummy OTP for testing
  const dummyOTP = '123456';

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number');
      return;
    }

    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (validPhoneNumbers.includes(phoneNumber)) {
        setStep('otp');
        setSuccess('OTP sent successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Phone number not found in our database. Please contact support.');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (otp === dummyOTP) {
        setSuccess('Phone number verified successfully!');
        setTimeout(() => {
          onVerificationSuccess(phoneNumber);
        }, 1000);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    setOtp('');
    setError('');
    setSuccess('OTP resent successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="phone-verification-overlay">
      <div className="phone-verification-modal">
        <div className="verification-header">
          <h2 className="verification-title">
            {step === 'phone' ? 'Phone Verification' : 'Enter OTP'}
          </h2>
          <p className="verification-subtitle">
            {step === 'phone' 
              ? 'Enter your registered phone number to access the dashboard'
              : `OTP sent to ${phoneNumber}`
            }
          </p>
        </div>

        {step === 'phone' ? (
          <div className="verification-form">
            <div className="input-group">
              <label htmlFor="phone" className="input-label">
                Phone Number
              </label>
              <div className="input-wrapper">
                <Phone className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  className="phone-input"
                />
              </div>
            </div>

            <div className="button-group">
              <button
                onClick={onCancel}
                className="cancel-button"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSendOTP}
                disabled={loading || !phoneNumber.trim()}
                className="send-otp-button"
              >
                {loading ? (
                  <div className="loading-spinner" />
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="button-icon" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="verification-form">
            <div className="input-group">
              <label htmlFor="otp" className="input-label">
                OTP Code
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="otp-input"
                />
              </div>
            </div>

            <div className="otp-info">
              <p className="otp-hint">
                Demo OTP: <strong>123456</strong>
              </p>
              <button
                onClick={handleResendOTP}
                className="resend-button"
                disabled={loading}
              >
                Resend OTP
              </button>
            </div>

            <div className="button-group">
              <button
                onClick={handleBackToPhone}
                className="back-button"
                disabled={loading}
              >
                Back
              </button>
              <button
                onClick={handleVerifyOTP}
                disabled={loading || !otp.trim()}
                className="verify-button"
              >
                {loading ? (
                  <div className="loading-spinner" />
                ) : (
                  <>
                    Verify OTP
                    <CheckCircle className="button-icon" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            <XCircle className="error-icon" />
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            <CheckCircle className="success-icon" />
            {success}
          </div>
        )}

        <div className="verification-footer">
          <p className="footer-text">
            <strong>Demo Phone Numbers:</strong> 9876543210, 9876543211, 9876543212
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification; 