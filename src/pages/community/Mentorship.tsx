import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import BottomNav from "@/components/BottomNav";

const Mentorship = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/community")}>
          <ArrowLeft className="h-6 w-6 text-green-700" />
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Under Construction</DialogTitle>
            <DialogDescription>
              The mentorship program is currently under development. We're working hard to bring you the best farming mentorship experience. Please check back soon!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>
              Ok, Great!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-green-800 mb-4">Mentorship Program</h1>
        <p className="text-gray-600">
          Coming soon! Our mentorship program will connect you with experienced farmers who can guide you through your farming journey.
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Mentorship;