import React, { useState } from 'react';
import IMAGES from '../../constants';

const AccountAccessControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const loginHistory = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Lagos, Nigeria',
      ipAddress: '197.210.xxx.xxx',
      date: '2025-09-02 14:30',
      status: 'success'
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'Lagos, Nigeria',
      ipAddress: '197.210.xxx.xxx',
      date: '2025-09-01 09:15',
      status: 'success'
    },
    {
      id: 3,
      device: 'Chrome on Android',
      location: 'Abuja, Nigeria',
      ipAddress: '102.89.xxx.xxx',
      date: '2025-08-30 16:45',
      status: 'failed'
    },
    {
      id: 4,
      device: 'Firefox on Windows',
      location: 'Lagos, Nigeria',
      ipAddress: '197.210.xxx.xxx',
      date: '2025-08-29 11:20',
      status: 'success'
    }
  ];

  const connectedApps = [
    {
      id: 1,
      name: 'WhatsApp Business',
      description: 'Connect with customers via WhatsApp',
      icon: IMAGES.whatsapp,
      connected: true,
      lastUsed: '2025-09-02'
    },
    {
      id: 2,
      name: 'Instagram Business',
      description: 'Sync products with Instagram Shopping',
      icon: IMAGES.instagram,
      connected: true,
      lastUsed: '2025-09-01'
    },
    {
      id: 3,
      name: 'Facebook Shop',
      description: 'Sell products on Facebook Marketplace',
      icon: IMAGES.facebook,
      connected: false,
      lastUsed: null
    }
  ];

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'pk_live_51***************************7890',
      created: '2025-08-15',
      lastUsed: '2025-09-02',
      status: 'active'
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'pk_test_51***************************1234',
      created: '2025-07-20',
      lastUsed: '2025-08-28',
      status: 'active'
    }
  ];

  return (
    <div className="flex-1 p-8 bg-white rounded-[20px]">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Account Access Control</h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'security'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Security Settings
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'activity'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Login Activity
          </button>
          <button
            onClick={() => setActiveTab('apps')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'apps'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Connected Apps
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'api'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            API Access
          </button>
        </div>

        {/* Security Settings Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Password Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Password & Authentication</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Change Password
                  </button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium">Recovery Email</h4>
                    <p className="text-sm text-gray-600">s****@gmail.com</p>
                  </div>
                  <button className="text-blue-600 hover:underline">
                    Update Email
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Security Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Get notified about login attempts and security changes</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-600">Get SMS alerts for critical security events</p>
                  </div>
                  <button
                    onClick={() => setSmsNotifications(!smsNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        smsNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Login Activity</h3>
            
            <div className="space-y-4">
              {loginHistory.map((login) => (
                <div key={login.id} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${login.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <div className="font-medium">{login.device}</div>
                      <div className="text-sm text-gray-600">{login.location} • {login.ipAddress}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{login.date}</div>
                    <div className={`text-xs ${login.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {login.status === 'success' ? 'Successful' : 'Failed'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="text-blue-600 hover:underline text-sm">
                View all login activity
              </button>
            </div>
          </div>
        )}

        {/* Connected Apps Tab */}
        {activeTab === 'apps' && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Connected Applications</h3>
              
              <div className="space-y-4">
                {connectedApps.map((app) => (
                  <div key={app.id} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
                    <div className="flex items-center gap-4">
                      <img src={app.icon} alt={app.name} className="w-10 h-10 rounded-lg" />
                      <div>
                        <div className="font-medium">{app.name}</div>
                        <div className="text-sm text-gray-600">{app.description}</div>
                        {app.lastUsed && (
                          <div className="text-xs text-gray-500">Last used: {app.lastUsed}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {app.connected ? (
                        <>
                          <span className="text-green-600 text-sm font-medium">Connected</span>
                          <button className="text-red-600 hover:underline text-sm">
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* API Access Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">API Keys</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Create New Key
                </button>
              </div>
              
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{key.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        key.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {key.status}
                      </span>
                    </div>
                    
                    <div className="bg-gray-100 rounded p-2 mb-3 font-mono text-sm">
                      {key.key}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div>
                        Created: {key.created} • Last used: {key.lastUsed}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:underline">Copy</button>
                        <button className="text-red-600 hover:underline">Revoke</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">API Documentation</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Learn how to integrate with our API to build custom applications and automate your store operations.
                </p>
                <button className="text-blue-600 hover:underline text-sm">
                  View API Documentation →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountAccessControl;
