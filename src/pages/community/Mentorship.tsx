import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, UserPlus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import BottomNav from "@/components/BottomNav";

type MentorshipRequest = {
  mentorId: string;
  message: string;
};

type ChatMessage = {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
};

const Mentorship = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const mentors = [
    {
      id: "1",
      title: "Expert Livestock Farmer",
      name: "Rre Mokgosi",
      experience: "15 years",
      specialization: "Cattle Farming",
      availability: "Weekends",
      location: "Gaborone",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf"
    },
    {
      id: "2",
      title: "Organic Farming Specialist",
      name: "Mme Phiri",
      experience: "10 years",
      specialization: "Organic Vegetables",
      availability: "Weekdays",
      location: "Maun",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
    }
  ];

  const handleBecomeMentor = (data: any) => {
    console.log("Becoming mentor:", data);
    toast({
      title: "Mentor Application Submitted",
      description: "Your application to become a mentor has been received.",
    });
  };

  const handleRequestMentorship = (mentor: any, message: string) => {
    console.log("Requesting mentorship from:", mentor.name);
    toast({
      title: "Request Sent",
      description: `Your mentorship request has been sent to ${mentor.name}.`,
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    
    // Simulate mentor response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: selectedMentor.name,
        message: "Thank you for your message. I'll get back to you soon.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/community")}>
              <ArrowLeft className="h-6 w-6 text-green-700" />
            </Button>
            <div className="flex items-center space-x-2">
              <UserPlus className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Mentorship Program</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Connect with Mentors</h2>
            <p className="text-gray-600 mb-4">
              Learn from experienced farmers through our mentorship program.
              Get guidance and support to improve your farming practices.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Become a Mentor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Become a Mentor</DialogTitle>
                </DialogHeader>
                <Form {...useForm()}>
                  <form onSubmit={(e) => { e.preventDefault(); handleBecomeMentor(e); }} className="space-y-4">
                    <FormField
                      control={useForm().control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farming Specialization</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Livestock, Crops, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={useForm().control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Submit Application</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {mentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex items-center p-4 bg-green-50">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-green-800">{mentor.title}</h3>
                      <p className="text-green-600">{mentor.name}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600"><strong>Experience:</strong> {mentor.experience}</p>
                      <p className="text-gray-600"><strong>Specialization:</strong> {mentor.specialization}</p>
                      <p className="text-gray-600"><strong>Availability:</strong> {mentor.availability}</p>
                      <p className="text-gray-600"><strong>Location:</strong> {mentor.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1 bg-green-600 hover:bg-green-700">
                            Request Mentorship
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Request Mentorship</DialogTitle>
                          </DialogHeader>
                          <Form {...useForm()}>
                            <form onSubmit={(e) => { e.preventDefault(); handleRequestMentorship(mentor, ""); }} className="space-y-4">
                              <FormField
                                control={useForm().control}
                                name="message"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Message to Mentor</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Explain what you'd like to learn..."
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button type="submit" className="w-full">Send Request</Button>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedMentor(mentor);
                          setChatOpen(true);
                        }}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chat with {selectedMentor?.name}</DialogTitle>
          </DialogHeader>
          <div className="h-[300px] overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-green-100 ml-auto max-w-[80%]"
                    : "bg-gray-100 mr-auto max-w-[80%]"
                }`}
              >
                <p className="font-semibold text-sm">{msg.sender}</p>
                <p>{msg.message}</p>
                <p className="text-xs text-gray-500">{msg.timestamp}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Mentorship;