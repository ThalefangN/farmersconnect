import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BottomNav from "@/components/BottomNav";

const About = () => {
  const faqs = [
    {
      question: "What is Farmers Connect?",
      answer: "Farmers Connect is a comprehensive platform designed to empower farmers through collaboration and innovation. We provide tools for resource sharing, knowledge exchange, and community building among farmers."
    },
    {
      question: "How can I join the platform?",
      answer: "You can join by clicking the 'Sign Up' button and creating an account. You'll need to provide some basic information about yourself and your farming activities."
    },
    {
      question: "What features are available?",
      answer: "Our platform offers animal tracking, forums for discussion, resource sharing, marketplace for buying/selling, learning resources, and community features for connecting with other farmers."
    },
    {
      question: "Is the platform free to use?",
      answer: "Yes, basic features are free to use. Some premium features and services may require payment."
    },
    {
      question: "How can I get help if I have issues?",
      answer: "You can reach out through our contact form, visit our help center, or post your question in the community forums."
    }
  ];

  return (
    <div className="min-h-screen bg-green-600">
      <div className="max-w-4xl mx-auto p-4 pb-20">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-4">About Farmers Connect</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Our Mission</h2>
            <p className="text-gray-700">
              To revolutionize farming through technology and community collaboration, making agriculture more sustainable and profitable for everyone.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-3">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">Animal Tracking</h3>
                <p className="text-gray-600">Monitor and manage your livestock efficiently</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">Resource Sharing</h3>
                <p className="text-gray-600">Share and access farming equipment and resources</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">Knowledge Hub</h3>
                <p className="text-gray-600">Access farming guides and educational content</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">Community</h3>
                <p className="text-gray-600">Connect with other farmers and share experiences</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-green-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-3">Contact Us</h2>
            <p className="text-gray-700">
              Have questions or suggestions? Reach out to us at support@farmersconnect.com or through our community forums.
            </p>
          </section>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default About;