import React, { useState } from "react";
import IMAGES from "../../constants";

interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'user' | 'support';
}

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface SupportContact {
  id: string;
  name: string;
  avatar: string;
  status: 'Pending' | 'Resolved';
  time: string;
  type: 'Customer Agent' | 'Store';
  hasNotification?: boolean;
}

const Support: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Resolved'>('All');
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportForm, setSupportForm] = useState({
    issueCategory: "",
    issueDetails: "",
    attachment: null as File | null
  });

  const supportContacts: SupportContact[] = [
    {
      id: "1",
      name: "Customer Agent - Adam",
      avatar: IMAGES.adam,
      status: 'Pending',
      time: "Today | 07:22 AM",
      type: 'Customer Agent',
      hasNotification: true
    },
    {
      id: "2",
      name: "Vee Stores",
      avatar: IMAGES.vee,
      status: 'Resolved',
      time: "Today | 07:22 AM",
      type: 'Store',
      hasNotification: true
    },
    {
      id: "3",
      name: "Customer Agent - Trey",
      avatar: IMAGES.sasha,
      status: 'Resolved',
      time: "Today | 07:22 AM",
      type: 'Customer Agent'
    },
    {
      id: "4",
      name: "Customer Agent - Trey",
      avatar: IMAGES.adam,
      status: 'Pending',
      time: "Today | 07:22 AM",
      type: 'Customer Agent'
    },
    {
      id: "5",
      name: "Customer Agent - Trey",
      avatar: IMAGES.vee,
      status: 'Resolved',
      time: "Today | 07:22 AM",
      type: 'Customer Agent'
    },
    {
      id: "6",
      name: "Customer Agent - Trey",
      avatar: IMAGES.sasha,
      status: 'Resolved',
      time: "Today | 07:22 AM",
      type: 'Customer Agent'
    }
  ];

  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "iPhone 16 pro max - Black",
      price: "N2,500,000",
      quantity: 1,
      image: "/iphone.svg"
    },
    {
      id: "2",
      name: "iPhone 16 pro max - Black",
      price: "N2,500,000", 
      quantity: 1,
      image: "/iphone.svg"
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      text: "How will I get the product delivered",
      time: "07:22AM",
      sender: "user"
    },
    {
      id: "2", 
      text: "Thank you for purchasing from us",
      time: "07:22AM",
      sender: "support"
    },
    {
      id: "3",
      text: "I will arrange a dispatch rider soon and I will contact you",
      time: "07:22AM",
      sender: "support"
    },
    {
      id: "4",
      text: "Okay I will be expecting.",
      time: "07:22AM",
      sender: "user"
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message sending logic here
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[N,]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const formatPrice = (amount: number) => {
    return `N${amount.toLocaleString()}`;
  };

  const filteredContacts = supportContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || contact.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex-1 p-4 bg-gray-50 rounded-[20px]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Support</h1>
        
        {!selectedContact ? (
          // Support Conversations List
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search chat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {(['All', 'Pending', 'Resolved'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Conversations List */}
            <div className="divide-y divide-gray-100">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact.id)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900">{contact.name}</h3>
                        <p className={`text-xs ${
                          contact.status === 'Pending' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {contact.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{contact.time}</span>
                      {contact.hasNotification && (
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Detailed Chat Interface (existing design)
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Back Button and Header */}
            <div className="bg-white border-b border-gray-100 p-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="relative">
                  <img
                    src={IMAGES.sasha}
                    alt="Sasha Stores"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Sasha Stores</h3>
                  <p className="text-xs text-gray-500">Online • Last seen</p>
                </div>
              </div>
            </div>

            {/* Cart Items Section */}
            <div className="p-4 bg-red-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900">Items in cart (2)</h4>
                <span className="text-sm font-bold text-red-600">{formatPrice(getTotalAmount())}</span>
              </div>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-red-600 font-semibold">{item.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Qty {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages Section */}
            <div className="flex-1 p-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[280px] px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-[#E53E3E] text-white'
                          : 'bg-red-50 text-gray-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mt-1`}>
                        <p className={`text-xs ${
                          message.sender === 'user' ? 'text-red-200' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-100 p-4">
              <div className="relative">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full">
                  <button 
                    onClick={() => setShowSupportForm(true)}
                    className="p-3 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message"
                    className="flex-1 px-2 py-3 bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500"
                  />
                  
                  <button
                    onClick={handleSendMessage}
                    className="p-3 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support Form Popup */}
        {showSupportForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
            <div className="bg-[#F9F9F9] rounded-3xl w-[400px] max-w-full p-6 shadow-2xl relative">
              {/* Close Button */}
              <button 
                onClick={() => setShowSupportForm(false)}
                className="absolute top-4 right-4 cursor-pointer hover:opacity-70"
              >
                <img src={IMAGES.xCircle} alt="Close" className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-6 pop_up">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Support Form</h2>
              </div>

              {/* Form */}
              <form className="space-y-4">
                {/* Issue Category */}
                <div className="relative">
                  <select
                    value={supportForm.issueCategory}
                    onChange={(e) => setSupportForm({...supportForm, issueCategory: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="">Issue Category</option>
                    <option value="order">Order Issues</option>
                    <option value="payment">Payment Problems</option>
                    <option value="delivery">Delivery Issues</option>
                    <option value="product">Product Quality</option>
                    <option value="refund">Refund Request</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Issue Details */}
                <div>
                  <textarea
                    placeholder="Type Issue Details"
                    value={supportForm.issueDetails}
                    onChange={(e) => setSupportForm({...supportForm, issueDetails: e.target.value})}
                    rows={6}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Attachment Section */}
                <div className="flex items-center ">
                  <label className="w-16 h-16 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setSupportForm({...supportForm, attachment: file});
                      }}
                      accept="image/*,application/pdf,.doc,.docx"
                    />
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </label>
                </div>

                {/* File name display */}
                {supportForm.attachment && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{supportForm.attachment.name}</p>
                  </div>
                )}

                {/* Proceed Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#E53E3E] text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle form submission here
                      console.log("Support form submitted:", supportForm);
                      setShowSupportForm(false);
                      // Reset form
                      setSupportForm({
                        issueCategory: "",
                        issueDetails: "",
                        attachment: null
                      });
                    }}
                  >
                    Proceed
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

export default Support;
