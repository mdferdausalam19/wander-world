import { useState } from "react";

const faqData = [
  {
    question: "Do I need to create an account to use Wander World?",
    answer:
      "Yes, creating a free account allows you to save your favorite spots, manage your own listings if you're a host.",
  },
  {
    question: "How can I book a tourist spot?",
    answer:
      "You cannot book a tourist spot. You can only view the details of the tourist spot and like them.",
  },
  {
    question: "Can I add my own tourist spot?",
    answer:
      "Absolutely! If you're a host, you can add your destination from the 'Add Tourist Spot' page and manage it from your 'My Travel List' page.",
  },
  {
    question: "Is there a premium feature in Wander World?",
    answer:
      "No, currently there is no premium feature available. We are working on it.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>
          <p className="text-gray-700">
            Find answers to common questions about our travel services
          </p>
        </div>

        <div className="space-y-2">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-emerald-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                className={`w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-emerald-50  transition-colors `}
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-emerald-900">
                  {faq.question}
                </span>
                <span
                  className={`text-emerald-600 text-2xl transition-transform duration-200 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`pt-0 text-emerald-800 transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-60 opacity-100 px-6 py-4 mt-4"
                    : "max-h-0 opacity-0"
                }`}
                aria-hidden={openIndex !== index}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
