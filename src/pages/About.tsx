import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BottomNav from "@/components/BottomNav";

const About = () => {
  const faqs = [
    {
      question: "What is Sebotsa Farmers Hub?",
      answer: "Sebotsa Farmers Hub is a comprehensive platform designed to connect and empower farmers in Botswana. We provide tools for resource sharing, knowledge exchange, and community building among agricultural professionals."
    },
    {
      question: "How can I join the platform?",
      answer: "You can easily join by clicking the 'Sign Up' button and creating an account. You'll need to provide some basic information about yourself and your farming activities."
    },
    {
      question: "What features are available?",
      answer: "Our platform offers various features including equipment sharing, marketplace for agricultural products, community forums, event management, mentorship programs, and real-time animal tracking."
    },
    {
      question: "Is the platform free to use?",
      answer: "Basic features are free for all registered users. Some premium features and services may require additional payment."
    },
    {
      question: "How can I list my equipment for rent?",
      answer: "After logging in, navigate to the Resources section, select 'Equipment', and click on 'List Equipment'. Follow the prompts to add details about your equipment."
    },
    {
      question: "How does the marketplace work?",
      answer: "The marketplace allows farmers to buy and sell agricultural products. You can list your products, set prices, and connect with potential buyers directly through the platform."
    }
  ];

  return (
    <div className="min-h-screen bg-[#16a34a] pb-16">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* About Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-green-800 mb-4">About Sebotsa</h1>
            <p className="text-gray-700 mb-6">
              Sebotsa Farmers Hub is your premier agricultural collaboration platform in Botswana. 
              We're dedicated to revolutionizing farming practices by connecting farmers, sharing resources, 
              and fostering a community of agricultural innovation and knowledge exchange.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-green-700">Our Mission</h2>
                <p className="text-gray-600">
                  To empower farmers through technology, community, and shared resources, 
                  making sustainable agriculture accessible and profitable for everyone.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-green-700">Our Vision</h2>
                <p className="text-gray-600">
                  To create a thriving agricultural ecosystem where every farmer has access to the 
                  tools, knowledge, and support needed to succeed.
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 border border-green-100 rounded-lg">
                <h3 className="font-semibold text-green-700">Resource Sharing</h3>
                <p className="text-gray-600">Access and share farming equipment and resources</p>
              </div>
              <div className="p-4 border border-green-100 rounded-lg">
                <h3 className="font-semibold text-green-700">Marketplace</h3>
                <p className="text-gray-600">Buy and sell agricultural products</p>
              </div>
              <div className="p-4 border border-green-100 rounded-lg">
                <h3 className="font-semibold text-green-700">Community</h3>
                <p className="text-gray-600">Connect with other farmers and experts</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-green-800 hover:text-green-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              Have questions or need support? We're here to help! Reach out to us through:
            </p>
            <div className="mt-4 space-y-2 text-gray-600">
              <p>Email: support@sebotsa.com</p>
              <p>Phone: +267 XXXX XXXX</p>
              <p>Hours: Monday - Friday, 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default About;