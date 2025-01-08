import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PawPrint } from "lucide-react";

const RegisterAnimal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [animalId, setAnimalId] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to register an animal",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("animals").insert({
        owner_id: user.id,
        animal_id: animalId,
        color,
        name,
        type,
        tracking_enabled: true,
      });

      if (error) throw error;

      toast({
        title: "Animal registered successfully",
        description: "You can now track your animal's location",
      });
      
      navigate("/animal-tracking");
    } catch (error) {
      console.error("Error registering animal:", error);
      toast({
        title: "Error",
        description: "Failed to register animal. Please try again.",
        variant: "destructive",
      });
    }
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <PawPrint className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800">Register Animal</h1>
          <p className="text-green-600 mt-2">Enter your animal's details for tracking</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Animal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="animalId">Animal ID</Label>
                <Input
                  id="animalId"
                  required
                  value={animalId}
                  onChange={(e) => setAnimalId(e.target.value)}
                  placeholder="Enter animal ID"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Name (Optional)</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter animal name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="e.g., Cow, Sheep, Goat"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Enter animal color"
                />
              </div>

              <Button type="submit" className="w-full">
                Register for Tracking
              </Button>
            </form>
          </CardContent>
        </Card>

        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Animal Tracking</DialogTitle>
              <DialogDescription className="space-y-4 pt-4">
                <p>
                  By enabling tracking for your animal, you acknowledge and agree to the following:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your animal's location will be monitored 24/7</li>
                  <li>Location data will be stored securely in our systems</li>
                  <li>You can access this data anytime through the tracking interface</li>
                  <li>You can disable tracking at any time through the settings</li>
                </ul>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>
                I Agree
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RegisterAnimal;