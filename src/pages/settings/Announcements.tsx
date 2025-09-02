import React, { useState } from 'react';
import IMAGES from '../../constants';

const Announcements: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const announcements = [
    {
      id: 1,
      title: 'New Feature: Advanced Analytics Dashboard',
      content: 'We are excited to announce the launch of our new advanced analytics dashboard. Track your sales, customer behavior, and store performance with detailed insights and real-time data.',
      type: 'feature',
      priority: 'high',
      date: '2025-09-01',
      status: 'published',
      views: 1250,
      engagement: 45
    },
    {
      id: 2,
      title: 'Maintenance Scheduled - September 10th',
      content: 'Scheduled maintenance will occur on September 10th from 2:00 AM to 4:00 AM WAT. During this time, some features may be temporarily unavailable.',
      type: 'maintenance',
      priority: 'medium',
      date: '2025-08-28',
      status: 'published',
      views: 980,
      engagement: 23
    },
    {
      id: 3,
      title: 'Holiday Sales Campaign Guidelines',
      content: 'Prepare for the upcoming holiday season with our comprehensive sales campaign guidelines. Learn best practices for promotions, inventory management, and customer engagement.',
      type: 'campaign',
      priority: 'medium',
      date: '2025-08-25',
      status: 'draft',
      views: 0,
      engagement: 0
    },
    {
      id: 4,
      title: 'Security Update - Two-Factor Authentication',
      content: 'Enhanced security measures are now available. Enable two-factor authentication to protect your seller account and customer data.',
      type: 'security',
      priority: 'high',
      date: '2025-08-20',
      status: 'published',
      views: 2100,
      engagement: 78
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'campaign': return 'bg-green-100 text-green-800';
      case 'security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    if (activeTab === 'all') return true;
    if (activeTab === 'published') return announcement.status === 'published';
    if (activeTab === 'drafts') return announcement.status === 'draft';
    return true;
  });

  return (
    <div className="flex-1 p-8 bg-white rounded-[20px]">
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Announcements</h1>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <img src={IMAGES.megaphone} alt="Create" className="w-4 h-4" />
            Create Announcement
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="text-sm font-medium opacity-90">Total Announcements</h3>
            <p className="text-2xl font-bold">{announcements.length}</p>
            <span className="text-xs opacity-75">All time</span>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <h3 className="text-sm font-medium opacity-90">Published</h3>
            <p className="text-2xl font-bold">{announcements.filter(a => a.status === 'published').length}</p>
            <span className="text-xs opacity-75">Currently live</span>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
            <h3 className="text-sm font-medium opacity-90">Total Views</h3>
            <p className="text-2xl font-bold">{announcements.reduce((sum, a) => sum + a.views, 0).toLocaleString()}</p>
            <span className="text-xs opacity-75">This month</span>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-sm font-medium opacity-90">Engagement</h3>
            <p className="text-2xl font-bold">{announcements.reduce((sum, a) => sum + a.engagement, 0)}</p>
            <span className="text-xs opacity-75">Total interactions</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({announcements.length})
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'published'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Published ({announcements.filter(a => a.status === 'published').length})
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'drafts'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Drafts ({announcements.filter(a => a.status === 'draft').length})
          </button>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(announcement.priority)}`}></div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(announcement.type)}`}>
                      {announcement.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                      {announcement.status}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-2">{announcement.content}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>Published: {announcement.date}</span>
                    <span>Views: {announcement.views.toLocaleString()}</span>
                    <span>Engagement: {announcement.engagement}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                    <img src={IMAGES.PencilSimpleLine} alt="Edit" className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <img src={IMAGES.Trash} alt="Delete" className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg">
                    <img src={IMAGES.DotsThreeOutlineVertical} alt="More" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <img src={IMAGES.megaphone} alt="No announcements" className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600 mb-4">Create your first announcement to communicate with your customers.</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Announcement
            </button>
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Create New Announcement</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <img src={IMAGES.Cross} alt="Close" className="w-6 h-6" />
                </button>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter announcement title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="feature">Feature</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="campaign">Campaign</option>
                    <option value="security">Security</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter announcement content"
                  ></textarea>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
