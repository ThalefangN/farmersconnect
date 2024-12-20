import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PSLECourses = () => {
  const courses = [
    {
      title: "Mathematics",
      description: "Foundation mathematics for PSLE",
      price: 150.00,
      rating: 4.8
    },
    {
      title: "English Language",
      description: "Improve basic English skills",
      price: 130.00,
      rating: 4.7
    },
    {
      title: "Science",
      description: "Introduce basic science concepts",
      price: 180.00,
      rating: 4.6
    },
    {
      title: "Social Studies",
      description: "Learn about social studies concepts",
      price: 170.00,
      rating: 4.5
    },
    {
      title: "Setswana",
      description: "Introduction to Setswana language",
      price: 160.00,
      rating: 4.7
    },
    {
      title: "ICT",
      description: "Introduction to computers and technology",
      price: 200.00,
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold mb-6">PSLE Courses</h1>

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

export default PSLECourses;