import { motion } from "framer-motion";
import { Calendar, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CurrentExams = () => {
  const currentExams = [
    {
      title: "Mathematics Mock Test",
      subject: "Mathematics",
      dueDate: "Today",
      duration: "2 hours",
      status: "In Progress"
    },
    {
      title: "English Essay",
      subject: "English",
      dueDate: "Tomorrow",
      duration: "1.5 hours",
      status: "Not Started"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold">Current Exams</h1>
        <div className="grid gap-4">
          {currentExams.map((exam, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {exam.title}
                </CardTitle>
                <CardDescription>{exam.subject}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Due: {exam.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Duration: {exam.duration}</span>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full">Start Exam</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CurrentExams;