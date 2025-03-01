
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How do I access my courses after purchasing?",
      answer: "After purchasing a course, you can access it immediately by logging into your account and navigating to 'My Courses' in your dashboard. All your purchased courses will be available there for the duration of your access period."
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee for all our courses. If you're not satisfied with your purchase, you can request a refund within 30 days of the purchase date."
    },
    {
      question: "Can I download course materials for offline viewing?",
      answer: "Yes, Pro and Enterprise plan members can download course materials for offline viewing. This includes video lectures, PDFs, and other resources provided by the instructor."
    },
    {
      question: "How long do I have access to a course?",
      answer: "Basic plan members have 7-day access to course materials. Pro and Enterprise plan members have lifetime access to all purchased courses, including future updates to the course content."
    },
    {
      question: "Do you offer certificates upon completion?",
      answer: "Yes, all our courses include a certificate of completion that you can download and share on your LinkedIn profile or with potential employers."
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/20 text-primary dark:text-primary rounded-full text-sm font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Find answers to common questions about our platform, courses, and policies.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
