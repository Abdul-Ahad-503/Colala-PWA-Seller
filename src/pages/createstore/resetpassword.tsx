import React, { useState, useEffect } from 'react';

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Email, 2: Code verification, 3: New password
  const [timer, setTimer] = useState(60); // 1 minute timer
  const [timerActive, setTimerActive] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: number;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setTimer(60);
      setTimerActive(true);
    }, 1000);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 4) {
      alert('Please enter a valid 4-digit code');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1000);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      alert('Please fill in both password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Password reset successfully!');
      onClose();
      // Reset state
      setStep(1);
      setEmail('');
      setVerificationCode('');
      setNewPassword('');
      setConfirmPassword('');
      setTimer(60);
      setTimerActive(false);
    }, 1000);
  };

  const handleResendCode = () => {
    setTimer(60);
    setTimerActive(true);
    // Simulate resending code
    alert('Code resent to your email');
  };

  const handleClose = () => {
    onClose();
    // Reset state when closing
    setStep(1);
    setEmail('');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setTimer(60);
    setTimerActive(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F9F9F9] rounded-2xl w-[440px] max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <img src="/public/Vector.svg" alt="Close" className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col justify-center items-center pop_up text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Reset Password</h2>
        </div>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <>
            <p className="mr-12 mb-4 text-sm text-gray-600">
              Reset you password via your registered email
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img src="/public/sms.svg" alt="Email" className="w-5 h-6 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full h-[60px] pl-10 pr-4 py-3 text-[14px] border border-[#CDCDCD] rounded-2xl shadow-lg bg-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF] text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[60px] bg-[#E53E3E] text-white font-sm py-3 px-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Proceed'
                )}
              </button>
            </form>
          </>
        )}

        {/* Step 2: Code Verification */}
        {step === 2 && (
          <>
            <p className="mb-4 text-sm text-gray-600">
              Enter the code we sent to your email
            </p>
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="Enter Code"
                  className="w-full h-[60px] pl-4 pr-16 py-3 text-[14px] border border-[#CDCDCD] rounded-2xl shadow-lg bg-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF] text-sm"
                  maxLength={4}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#E53E3E] text-[10px] border border-[#E53E3E] px-3 py-1 rounded-2xl"
                >
                  Paste
                </button>
              </div>
              
              {/* Timer */}
              <div className="mb-4">
                {timerActive ? (
                  <p className="text-sm text-gray-600">
                    You can resend code in <span className="text-[#E53E3E] font-medium">{formatTime(timer)}</span>
                  </p>
                ) : (
                  <p className="text-sm  text-[#000000]">
                    You can resend code now
                  </p>
                )}
              </div>

              <button
                type={timerActive ? "submit" : "button"}
                onClick={timerActive ? undefined : handleResendCode}
                disabled={isLoading}
                className="w-full h-[60px] bg-[#E53E3E] text-white font-sm py-3 px-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : timerActive ? (
                  'Proceed'
                ) : (
                  'Resend Code'
                )}
              </button>
            </form>
          </>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {/* New Password */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <img src="/public/lock.svg" alt="Password Icon" className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full h-[60px] pl-10 pr-12 py-3 text-[14px] border border-[#CDCDCD] rounded-2xl shadow-lg bg-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF] text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <img src="/public/eye.svg" alt="Toggle Password Visibility" className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src="/public/lock.svg" alt="Password Icon" className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-Enter new password"
                className="w-full h-[60px] pl-10 pr-12 py-3 text-[14px] border border-[#CDCDCD] rounded-2xl shadow-lg bg-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF] text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <img src="/public/eye.svg" alt="Toggle Password Visibility" className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[60px] bg-[#E53E3E] text-white font-sm py-3 px-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Proceed'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
