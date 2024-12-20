import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNav from "@/components/BottomNav";

const Equipment = () => {
  const { toast } = useToast();
  const [equipment] = useState([
    {
      id: 1,
      name: "Tractor",
      description: "Heavy-duty farming tractor",
      price: "500/day",
      availability: "Available",
    },
    {
      id: 2,
      name: "Harvester",
      description: "Grain harvesting machine",
      price: "400/day",
      availability: "In Use",
    },
    {
      id: 3,
      name: "Plough",
      description: "3-furrow plough",
      price: "200/day",
      availability: "Available",
    },
  ]);

  const handleRent = (equipmentName: string) => {
    toast({
      title: "Request Sent",
      description: `Your request to rent the ${equipmentName} has been sent.`,
    });
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Wrench className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Farming Equipment</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">Price: {item.price}</p>
                  <p className={`text-sm ${
                    item.availability === "Available" ? "text-green-600" : "text-red-600"
                  }`}>
                    Status: {item.availability}
                  </p>
                  <Button
                    onClick={() => handleRent(item.name)}
                    disabled={item.availability !== "Available"}
                    className="w-full"
                  >
                    Rent Equipment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default Equipment;