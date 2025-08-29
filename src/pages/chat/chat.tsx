import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'user' | 'contact';
}

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState<string>("sasha-stores");
  const [newMessage, setNewMessage] = useState<string>("");

  // Function to map chat contact IDs to store IDs
  const getStoreIdFromContact = (contactId: string): string => {
    const contactToStoreMapping: { [key: string]: string } = {
      "sasha-stores": "1",    // Sasha Stores
      "vee-stores": "2",      // Vee Stores  
      "adam-stores": "3",     // Adam Stores
      "scent-villa": "4",     // Scent Villa Stores
      "power-stores": "5",    // Caremal Stores (mapped to a similar store)
      "creamila-stores": "6", // Lovina Stores (mapped to a similar store)
      "dannova-stores": "7",  // Tech Hub Store (mapped to a similar store)
    };
    
    return contactToStoreMapping[contactId] || "1"; // Default to Sasha Stores if not found
  };

  const contacts: ChatContact[] = [
    {
      id: "sasha-stores",
      name: "Sasha Stores",
      avatar: "/sashastore.svg",
      lastMessage: "How will I get my goods delivered ?",
      time: "Today | 07:20 AM",
      isOnline: true
    },
    {
      id: "vee-stores",
      name: "Vee Stores",
      avatar: "/vee.svg",
      lastMessage: "How will I get my goods delivered ?",
      time: "Today | 07:20 AM",
      isOnline: true
    },
    {
      id: "adam-stores",
      name: "Adam Stores",
      avatar: "/adam.svg",
      lastMessage: "How will I get my goods delivered ?",
      time: "Today | 07:20 AM",
      isOnline: false
    },
    {
      id: "scent-villa",
      name: "Scent Villa Stores",
      avatar: "/scent.svg",
      lastMessage: "How will I get my goods delivered ?",
      time: "Today | 07:20 AM",
      isOnline: false
    },
    {
      id: "power-stores",
      name: "Power Stores",
      avatar: "/power.svg",
      lastMessage: "How will I get my goods delivered ?",
      time: "Today | 07:20 AM",
      isOnline: false
    },
    {
      id: "creamila-stores",
      name: "Creamila Stores",
      avatar: "/creamila.svg",
      lastMessage: "How will I get my goods delivered ?",
      time: "Today | 07:20 AM",
      isOnline: false
    },
    {
      id: "dannova-stores",
      name: "Dannova Stores",
      avatar: "/dannova.svg",
      lastMessage: "How will I get my goods delivered ?",
      time: "Today | 07:20 AM",
      isOnline: false
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
      text: "How will i get the product delivered",
      time: "07:22AM",
      sender: "user"
    },
    {
      id: "2",
      text: "Thank you for purchasing from us",
      time: "07:22AM",
      sender: "contact"
    },
    {
      id: "3",
      text: "I will arrange a dispatch rider soon and i will contact you",
      time: "07:22AM",
      sender: "contact"
    },
    {
      id: "4",
      text: "Okay i will be expecting.",
      time: "07:22AM",
      sender: "user"
    }
  ];

  const selectedContactData = contacts.find(c => c.id === selectedContact);

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

  return (
    <div className=" max-w-[1280px]  mx-auto ">
      <div className="flex  gap-4 mx-4 mt-4">
        {/* Chat Contacts Sidebar */}
        <div className="h-[600px] w-[390px] rounded-2xl  p-4">
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`cursor-pointer transition-all ${
                  selectedContact === contact.id 
                    ? 'bg-white border-2 border-red-500  rounded-2xl p-4 shadow-sm' 
                    : 'bg-white rounded-2xl p-4 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                   
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[12px] font-medium text-gray-900 truncate">
                        {contact.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-[8px] text-gray-500">{contact.time}</span>
                        {contact.isOnline && (
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">1</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 truncate mt-1">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-[#FAFAFA] rounded-3xl h-[730 px] w-[669px] mr-4 shadow-lg mt-4  overflow-hidden">
          {selectedContactData ? (
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="bg-white p-1 flex items-center justify-between shadow-sm border-b border-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedContactData.avatar}
                      alt={selectedContactData.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-gray-900">
                      {selectedContactData.name}
                    </h3>
                    <p className="text-[6px] text-gray-500">Last seen 1hr ago</p>
                  </div>
                </div>
                
                {/* Cart Icon */}
                <div className=" p-3 rounded-xl">
                  <button 
                    onClick={() => navigate(`/chat/${getStoreIdFromContact(selectedContact)}`)}
                    className=" border border-[#CDCDCD] p-2 rounded-2xl  transition-colors hover:bg-gray-50"
                  >
                    <img src="/public/cart.png" alt="Go to store" className="w-5 h-5   cursor-pointer " />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="bg-[#FFE5E5] p-4  border border-[#E53E3E]     w-[580px]  mx-6 mt-4 rounded-2xl
               ">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[12px] font-medium text-gray-900">Items in cart (2)</h4>
                  <span className="text-[12px] font-bold text-red-600">N5,000,000</span>
                </div>
                
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3  bg-[#FAFAFA] rounded-xl p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12  object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="text-[12px] font-medium text-gray-900">{item.name}</h5>
                        <p className="text-[12px] text-red-600 font-semibold">{item.price}</p>
                      </div>
                      <span className="text-[12px] text-black">Qty {item.quantity}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Messages */}
              <div 
                className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-4 bg-[#FAFAFA]"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-red-500 text-white'
                          : 'bg-red-100 text-gray-900'
                      }`}
                      style={{
                        borderRadius: message.sender === 'user' 
                          ? '25px 25px 5px 25px' 
                          : '25px 25px 25px 5px'
                      }}
                    >
                      <p className="text-[12px] leading-relaxed font-medium">{message.text}</p>
                      <div className="flex justify-end mt-1">
                        <p className={`text-[10px] ${
                          message.sender === 'user' ? 'text-red-200' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white  p-3 mx-6 mb-6 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                   <img src="/public/Paperclip.svg" alt="Attach" className="w-6 h-6" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message"
                      className="w-full px-2 py-1 border-0 rounded-full focus:ring-0 focus:outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    className="p-3  text-white rounded-full  transition-colors"
                  >
                   <img src="/public/sendmsg.svg" alt="Send" className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
      </div>
    // 
  );
};

export default Chat;
