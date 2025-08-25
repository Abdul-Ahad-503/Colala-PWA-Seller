import React, { useState } from 'react';
import Cookies from 'js-cookie';
import IMAGES from '../../constants';
import Register from './register';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Store login data in cookies
      const loginData = {
        email,
        loginTime: new Date().toISOString(),
        isLoggedIn: true,
      };

      // Set cookie for 7 days
      Cookies.set('userLogin', JSON.stringify(loginData), { expires: 7 });
      Cookies.set('userEmail', email, { expires: 7 });
      Cookies.set('isLoggedIn', 'true', { expires: 7 });

      setIsLoading(false);
      onLogin(email);
      onClose();
      
      // Reset form
      setEmail('');
      setPassword('');
    }, 1000);
  };

  const handleCreateAccount = () => {
    setShowRegister(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
  };

  const handleRegister = (email: string) => {
    onLogin(email);
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log('Navigate to forgot password');
  };

  if (!isOpen) return null;

  // Show register component if showRegister is true
  if (showRegister) {
    return (
      <Register
        isOpen={isOpen}
        onClose={onClose}
        onRegister={handleRegister}
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl  overflow-hidden w-[876px] max-w-4xl h-[666px] flex relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6  right-6 w-10 h-10 -mt-3 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
        >
          <img src={IMAGES.Xcircle} alt="Close" className="w-8 h-8 ml-10" />
        </button>

        {/* Left Side - Complete Frame with Main Image Only */}
        <div className="w-1/2 bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
          {/* Main Image - Woman with phone covering full left side */}
          <div className="absolute top-0 left-0 w-full h-full">
            <img 
              src={IMAGES.login} 
              alt="Woman with phone" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-[24px] font-semibold text-[#E53E3E] mb-2">Login</h2>
            <p className="text-gray-500 text-[14px]">Login to you account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <img src="/public/sms.svg" alt="Email" className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
               <img src="/public/sms.svg" alt="Password" className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
               <img src="/public/eye.svg" alt="Toggle Password Visibility" className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 text-[14px] hover:bg-red-600 text-white font-medium py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>

            {/* Create Account Button */}
            <button
              type="button"
              onClick={handleCreateAccount}
              className="w-full bg-gray-100 text-[14px] hover:bg-gray-200 text-[#000000] font-semibold py-4 px-6 rounded-xl transition-colors"
            >
              Create Account
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center mt-6">
            <button
              onClick={handleForgotPassword}
              className="text-[#E53E3E] text-[14px] hover:text-red-600 font-medium"
            >
              Forgot Password ?
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
