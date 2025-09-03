import React, { useState } from 'react';

const AccountAccessControl: React.FC = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      email: 'abcdef@gmail.com',
      role: 'Admin',
      avatar: '/public/sashastore.svg'
    },
    {
      id: 2,
      email: 'abcdef@gmail.com',
      role: 'Admin',
      avatar: '/public/sashastore.svg'
    },
    {
      id: 3,
      email: 'abcdef@gmail.com',
      role: 'Admin',
      avatar: '/public/sashastore.svg'
    }
  ]);

  const handleRemoveUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-[653px] shadow-sm h-[800px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#000000] mb-2">Access Control</h1>
        <p className="text-[13px] text-gray-600 mb-1">
          Grant users access to manage parts of your account Input the
        </p>
        <p className="text-[13px] text-gray-600 mb-2">
          users email and you can add a unique password for each user.
        </p>
      </div>

      {/* Users Section */}
      <div className="mb-8">
        <h3 className="text-base font-medium text-gray-900 mb-6">Users</h3>

        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between py-4 px-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  <p className="text-[12px] text-red-500">{user.role}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors">
                 <img src="/public/edit1.svg" alt="Edit" className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleRemoveUser(user.id)}
                  className="p-2 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors"
                >
                  <img src="/public/delete1.svg" alt="Delete" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New User Button */}
      
        <button className="w-[602px] mt-55 h-[60px]  text-[12px] py-3 bg-[#E53E3E] text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
          Add new User
        </button>
      </div>
    
  );
};

export default AccountAccessControl;
