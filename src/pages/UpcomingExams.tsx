import { motion } from "framer-motion";
import { Calendar, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UpcomingExams = () => {
  const upcomingExams = [
    {
      title: "BGCSE Mathematics Final",
      subject: "Mathematics",
      date: "In 2 weeks",
      duration: "3 hours",
      venue: "Main Hall"
    },
    {
      title: "JCE English Final",
      subject: "English",
      date: "In 3 weeks",
      duration: "2.5 hours",
      venue: "Room 201"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold">Upcoming Exams</h1>
        <div className="grid gap-4">
          {upcomingExams.map((exam, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-purple-50">
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
                    <span className="text-sm">Date: {exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Duration: {exam.duration}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Venue: {exam.venue}
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

export default UpcomingExams;