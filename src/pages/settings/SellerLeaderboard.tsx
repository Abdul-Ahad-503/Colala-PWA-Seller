import React, { useState } from 'react';
import IMAGES from '../../constants';
import '../../index.css'
const SellerLeaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Today' | 'Weekly' | 'Monthly' | 'All Time'>('Today');
  const [showHowItWorksPopup, setShowHowItWorksPopup] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(3); // Question 4 expanded by default

  const faqData = [
    {
      id: 0,
      question: "Question 1",
      answer: "Answer for question 1 goes here..."
    },
    {
      id: 1,
      question: "Question 2", 
      answer: "Answer for question 2 goes here..."
    },
    {
      id: 2,
      question: "Question 3",
      answer: "Answer for question 3 goes here..."
    },
    {
      id: 3,
      question: "How are sellers ranked on Colala ?",
      answer: "Sellers are ranked based on several factors that contribute to their overall score"
    }
  ];

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const topSellers = [
    {
      rank: 1,
      name: "Sasha Stores",
      score: 200,
      avatar: IMAGES.sasha,
    },
    {
      rank: 2,
      name: "Vee Stores", 
      score: 180,
      avatar: IMAGES.vee,
    },
    {
      rank: 3,
      name: "Dan Stores",
      score: 150,
      avatar: IMAGES.adam,
    }
  ];

  const leaderboardList = [
    {
      rank: 4,
      name: "Kevin Stores",
      score: 100,
      avatar: IMAGES.sasha,
    },
    {
      rank: 5,
      name: "Rabby Stores",
      score: 70,
      avatar: IMAGES.vee,
    },
    {
      rank: 6,
      name: "Dann Stores",
      score: 350,
      avatar: IMAGES.adam,
    },
    {
      rank: 7,
      name: "Don Stores",
      score: 400,
      avatar: IMAGES.sasha,
    },
    {
      rank: 8,
      name: "Scent villa stores",
      score: 500,
      avatar: IMAGES.vee,
    },
    {
      rank: 9,
      name: "Tech Hub Stores",
      score: 320,
      avatar: IMAGES.adam,
    },
    {
      rank: 10,
      name: "Fashion World",
      score: 280,
      avatar: IMAGES.sasha,
    },
    {
      rank: 11,
      name: "Electronics Plus",
      score: 250,
      avatar: IMAGES.vee,
    },
    {
      rank: 12,
      name: "Home Essentials",
      score: 220,
      avatar: IMAGES.adam,
    },
    {
      rank: 13,
      name: "Sports Corner",
      score: 195,
      avatar: IMAGES.sasha,
    },
    {
      rank: 14,
      name: "Beauty Palace",
      score: 175,
      avatar: IMAGES.vee,
    },
    {
      rank: 15,
      name: "Book Haven",
      score: 160,
      avatar: IMAGES.adam,
    },
    {
      rank: 16,
      name: "Garden Center",
      score: 145,
      avatar: IMAGES.sasha,
    },
    {
      rank: 17,
      name: "Auto Parts Pro",
      score: 130,
      avatar: IMAGES.vee,
    },
    {
      rank: 18,
      name: "Toy Kingdom",
      score: 115,
      avatar: IMAGES.adam,
    }
  ];

  return (
    <div className="flex-1 p-4 bg-gray-50 rounded-[20px] ">
      <div className="max-w-4xl mx-auto">
        {/* Header Section with Red Gradient Background */}
        <div className="bg-gradient-to-br from-[#FF0000] to-[#70064B] rounded-3xl p-6 text-white relative min-h-screen overflow-hidden">
          {/* Help Button */}
          <button 
            onClick={() => setShowHowItWorksPopup(true)}
            className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
          >
            <img src={IMAGES.questionMark} alt="Help" />
          </button>

          {/* Title */}
          <h1 className="text-xl font-semibold mb-6">Seller Leaderboard</h1>

          {/* Time Period Tabs */}
          <div className="flex gap-6 mb-8">
            {(['Today', 'Weekly', 'Monthly', 'All Time'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[16px] text-[#FFFFFF80] pb-1 w-full  transition-colors ${
                  activeTab === tab
                    ? ' text-white text-[40px]'
                    : 'border-transparent text-white text-opacity-70 hover:text-opacity-90'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Podium Section */}
          <div className="relative flex items-end justify-center gap-4 h-40 mt-40">
            {/* Second Place */}
            <div className="flex flex-col items-center">
              <img
                src={topSellers[1].avatar}
                alt={topSellers[1].name}
                className="w-24 h-24 rounded-full border-4 border-[#FF4444] mb-2"
              />
              <p className="text-xs font-medium text-center mb-1">{topSellers[1].name}</p>
              <p className="text-sm font-bold mb-2">{topSellers[1].score}</p>
              <div className="relative w-auto h-12 -mr-30">
                <img
                  src={IMAGES.second}
                  alt="Second place"
                  className="w-35 h-auto object-contain "
                />
                <span className="absolute inset-0 flex items-center justify-center text-[100px] -mb-25 -ml-5 font-bold text-[#70064B]">
                  2
                </span>
              </div>
            </div>

            {/* First Place */}
            <div className="flex flex-col items-center">
              <img
                src={topSellers[0].avatar}
                alt={topSellers[0].name}
                className="w-29 h-29 rounded-full border-4 border-[#FF4444] mb-2"
              />
              <p className="text-sm font-medium text-center mb-1">{topSellers[0].name}</p>
              <p className="text-lg font-bold mb-2">{topSellers[0].score}</p>
              <div className="relative w-auto h-24 -mt-1 z-10">
                <img
                  src={IMAGES.first}
                  alt="First place"
                  className="w-40 h-auto object-contain z-10"
                />
                <span className="absolute inset-0 flex items-center justify-center text-[150px] -mb-20 font-bold text-[#70064B]">
                  1
                </span>
              </div>
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center">
              <img
                src={topSellers[2].avatar}
                alt={topSellers[2].name}
                className="w-24 h-24 rounded-full border-4 border-[#FF4444] mb-2"
              />
              <p className="text-xs font-medium text-center mb-1">{topSellers[2].name}</p>
              <p className="text-sm font-bold mb-2">{topSellers[2].score}</p>
              <div className="relative w-auto h-5 -ml-35">
                <img
                  src={IMAGES.third}
                  alt="Third place"
                  className="w-35 h-auto object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center text-[70px] -mb-30 font-bold text-[#70064B]">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-[#F9F9F9] rounded-t-[50px] relative z-20 p-6 -mt-90 shadow-sm">
          <div className="max-h-80 overflow-y-auto hide-scrollbar space-y-4">
            {leaderboardList.map((seller) => (
              <div
                key={seller.rank}
                className="flex items-center justify-between py-3 px-2 rounded-[10px] bg-white border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center  gap-4">
                  <span className="text-lg font-medium text-gray-600 w-6">{seller.rank}</span>
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium text-gray-900">{seller.name}</span>
                </div>
                <span className="text-lg font-bold text-[#E53E3E]">{seller.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Popup */}
        {showHowItWorksPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50">
            <div className="bg-[#F9F9F9] rounded-3xl w-[400px] max-w-full p-6 shadow-2xl relative">
              
              {/* Close Button */}
              <button 
                onClick={() => setShowHowItWorksPopup(false)}
                className="absolute top-4 right-4 cursor-pointer hover:opacity-70"
              >
                <img src={IMAGES.xCircle} alt="Close" className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-6 pop_up">
                <h2 className="text-xl font-bold  text-gray-900 mb-2">How it works</h2>
              </div>

              {/* FAQ Content */}
              <div className="space-y-4">
                {faqData.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 text-sm">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0">
                        {expandedFAQ === faq.id ? (
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        )}
                      </div>
                    </button>

                    {expandedFAQ === faq.id && (
                      <div className="px-4 pb-3 text-gray-700 text-sm border-t border-gray-100">
                        <div className="pt-3">{faq.answer}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerLeaderboard;


