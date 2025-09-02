import React, { useState } from 'react';
import IMAGES from '../../constants';

const FAQs: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0); // First FAQ expanded by default

  const faqs = [
    {
      id: 0,
      question: "How to setup my store",
      answer: "To setup your store on Colala, follow these simple steps: Download the store app, Fill your details, Complete KYC verification. Once verified, you can start listing your products and manage your store easily.",
      details: [
        "Download the store app",
        "Fill your details", 
        "Complete KYC"
      ]
    },
    {
      id: 1,
      question: "Do stores get referral bonus",
      answer: "Yes! Stores also get referral bonuses when they refer new customers or other stores to the platform. You earn commission on every successful referral that results in a purchase or store registration."
    },
    {
      id: 2,
      question: "Is there exclusive offer for new stores ?",
      answer: "Absolutely! New stores enjoy special benefits including reduced commission rates for the first 3 months, priority listing in search results, free featured product promotions, and dedicated support for store setup and optimization."
    },
    {
      id: 3,
      question: "Do you offer escrow services",
      answer: "Yes, we provide secure escrow services to protect both buyers and sellers. Payments are held securely until the buyer confirms receipt and satisfaction with their purchase, ensuring safe transactions for everyone."
    }
  ];

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="flex-1 p-4 bg-gray-50 rounded-[20px]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">FAQs</h1>
        
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* FAQs Image Header */}
          <div className="rounded-3xl overflow-hidden mb-8 relative">
            <img
              src={IMAGES.faqsImage}
              alt="FAQ Image"
              className="w-full h-64 object-cover"
            />
           
          </div>

          {/* FAQ Section */}
          <div className="p-6">
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-[#E53E3E] text-[14px]">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {expandedFAQ === faq.id ? (
                        <svg
                          className="w-5 h-5 text-[#E53E3E]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>

                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-4 text-gray-700 text-[12px] border-t border-gray-100">
                      <div className="pt-4">
                        <p className="mb-3">{faq.answer}</p>
                        {faq.details && (
                          <ul className="space-y-2 ml-4">
                            {faq.details.map((detail, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-[#E53E3E] rounded-full mr-3 flex-shrink-0"></span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Support Section */}
            <div className="mt-8 text-center py-6">
              <p className="text-gray-500 mb-4 text-[12px]">Still need help?</p>
              <button className="bg-[#E53E3E] text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium text-[14px]">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
