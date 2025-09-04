import React, { useState } from 'react';

const AccountAccessControl: React.FC = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveUser = () => {
    if (formData.email && formData.password && selectedRole) {
      const newUser = {
        id: users.length + 1,
        email: formData.email,
        role: selectedRole,
        avatar: '/public/sashastore.svg'
      };
      
      setUsers(prev => [...prev, newUser]);
      setIsAddUserModalOpen(false);
      setFormData({ email: '', password: '' });
      setSelectedRole('');
    }
  };

  const roles = [
    {
      name: 'Admin',
      description: 'Anyone with this admin role has access to',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
    },
    {
      name: 'Role 2',
      description: 'Anyone with this Role 2 role has access to',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
    }
  ];

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
                  <p className="text-[12px] text-primary">{user.role}</p>
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
      
        <button 
          onClick={() => setIsAddUserModalOpen(true)}
          className="w-[602px] mt-55 h-[60px]  text-[12px] py-3 bg-primary text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
        >
          Add new User
        </button>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#F9F9F9] rounded-3xl p-6 w-[430px]  relative h-[680px] ">
            {/* Header */}
           <div className="flex items-center justify-center pop_up relative p-6 pb-4 -mt-7 mb-1">
              <h2 className="text-[20px] font-semibold text-black">Add User</h2>
              <button 
                onClick={() => setIsAddUserModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full  flex items-center justify-center text-gray-500 hover:text-gray-700"
              >
                <img src="/public/Vector.svg" alt="Close" className="w-5 h-5 ml-8 -mt-2" />
              </button>
            </div>

            <div className="space-y-4">
              {/* User Email Address Input */}
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="User Email Address"
                  className="w-full h-[60px] px-4 py-3  bg-[#FFFFFF] rounded-xl focus:outline-none border border-[#CDCDCD] focus:ring-2 focus:ring-primary focus:border-transparent text-sm  shadow-medium"
                />
              </div>

              {/* User Password Input */}
              <div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="User Password"
                  className="w-full h-[60px] px-4 py-3  rounded-xl focus:outline-none focus:ring-2 border border-[#CDCDCD] focus:ring-primary focus:border-transparent text-sm bg-[#FFFFFF] shadow-medium"
                />
              </div>

              {/* Select Role - Static Display */}
              <div className="mb-4">
                <div className="flex items-center justify-between h-[60px]  px-4 py-3  border border-[#CDCDCD] rounded-xl bg-[#FFFFFF] shadow-medium">
                  <span className="text-gray-500 text-sm">Select Role</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Role Options - Always Visible */}
              <div className="space-y-4">
                {/* Admin Role */}
                <div className="cursor-pointer" onClick={() => setSelectedRole('Admin')}>
                  <div className="flex items-center mb-1">
                    
                    <h4 className="font-semibold text-[16px] text-gray-900 text-base">Admin</h4>
                  </div>
                  <p className="text-[12px] text-[#00000080] mb-3 ml-7">Anyone with the admin role has access to</p>
                  <ul className="ml-7 space-y-1">
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      Feature 1
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      Feature 2
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      Feature 3
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      Feature 4
                    </li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="cursor-pointer" onClick={() => setSelectedRole('Role 2')}>
                  <div className="flex items-center mb-1 -mt-2">
                    
                    <h4 className="font-semibold text-[16px] text-gray-900 text-base">Role 2</h4>
                  </div>
                  <p className="text-[12px] text-[#00000080] mb-3 ml-7">Anyone with the Role 2 role has access to</p>
                  <ul className="ml-7 space-y-1">
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      Feature 1
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      Feature 2
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      Feature 3
                    </li>
                    <li className="flex items-center text-[12px] text-gray-600">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                      Feature 4
                    </li>
                  </ul>
                </div>
              </div>

              {/* Save User Button */}
              <div className="pt-6">
                <button
                  onClick={handleSaveUser}
                  disabled={!formData.email || !formData.password || !selectedRole}
                  className="w-full py-3  -mt-14 bg-primary text-white rounded-xl font-medium hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Save User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      </div>
    
  );
};

export default AccountAccessControl;
