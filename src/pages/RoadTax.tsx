import { motion } from "framer-motion";
import { Award, ArrowLeft, Calendar, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const RoadTax = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Submission Successful",
      description: "Your exam request has been submitted successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6" />
            Assessments & Exams
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your examination schedule and access past papers
          </p>
        </div>

        {/* Submit Container */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Submit Exam Request</CardTitle>
            <CardDescription>Request special arrangements or report issues</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Enter your request or concern" />
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-card rounded-lg p-6 shadow-sm cursor-pointer"
            onClick={() => navigate("/current-exams")}
          >
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Current Exams</h2>
            <p className="text-sm text-muted-foreground">View your ongoing examinations and submissions</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-card rounded-lg p-6 shadow-sm cursor-pointer"
            onClick={() => navigate("/upcoming-exams")}
          >
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Upcoming Exams</h2>
            <p className="text-sm text-muted-foreground">Schedule of your future examinations</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-card rounded-lg p-6 shadow-sm cursor-pointer"
            onClick={() => navigate("/past-exams")}
          >
            <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Past Exams</h2>
            <p className="text-sm text-muted-foreground">Access previous exam papers and results</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoadTax;