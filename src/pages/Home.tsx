import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Car, CreditCard, Truck, Road, AlertTriangle, QrCode, Home, Settings, Bell, User } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";

const Home = () => {
  const services = [
    {
      title: "Driving License Services",
      description: "Learn more about driving license exam bookings and payments",
      icon: Car,
    },
    {
      title: "Permit & License Payments",
      description: "Pay for driving licenses and permits with ease",
      icon: CreditCard,
    },
    {
      title: "Vehicle Registration",
      description: "Register or renew your vehicle in a few simple steps",
      icon: Truck,
    },
    {
      title: "Road Tax Payments",
      description: "Pay road taxes and fees online quickly and easily",
      icon: Road,
    },
    {
      title: "Report an Issue",
      description: "Report issues like road accidents, traffic violations, etc",
      icon: AlertTriangle,
    },
    {
      title: "Digital Identity / QR Code",
      description: "Access your transport-related documents and digital ID",
      icon: QrCode,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold">Welcome, User!</h1>
            <p className="text-muted-foreground">What would you like to do today?</p>
          </div>
          <Button size="icon" variant="ghost">
            <User className="h-6 w-6" />
          </Button>
        </motion.div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search for a service..." />
        </div>

        <div className="grid gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;