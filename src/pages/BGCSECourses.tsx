import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BGCSECourses = () => {
  const courses = [
    {
      title: "Mathematics",
      description: "Learn all BGCSE-level mathematics",
      price: 400.00,
      rating: 4.8
    },
    {
      title: "English Language",
      description: "Master English for BGCSE exams",
      price: 350.00,
      rating: 4.7
    },
    {
      title: "Science",
      description: "Understanding the fundamentals of science",
      price: 380.00,
      rating: 4.6
    },
    {
      title: "History",
      description: "In-depth coverage of Botswana and world history",
      price: 300.00,
      rating: 4.5
    },
    {
      title: "Geography",
      description: "Learn physical and human geography",
      price: 320.00,
      rating: 4.6
    },
    {
      title: "Accounting",
      description: "Learn the basics of accounting",
      price: 350.00,
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold mb-6">BGCSE Courses</h1>

        <div className="grid gap-4">
          {courses.map((course, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">BWP {course.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    <span>{course.rating}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <Button className="w-full">Enroll Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BGCSECourses;