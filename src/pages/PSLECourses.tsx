import { useState } from "react";
import { motion } from "framer-motion";
import { Star, School, Calculator, Language, Flask, Globe, BookOpen, Computer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PaymentModal from "@/components/PaymentModal";

const PSLECourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<{
    title: string;
    price: number;
  } | null>(null);

  const courses = [
    {
      title: "Mathematics",
      description: "Learn fundamental mathematics concepts through interactive lessons and fun activities. Includes basic arithmetic, geometry, and problem-solving skills.",
      price: 150.00,
      rating: 4.8,
      icon: Calculator,
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      title: "English Language",
      description: "Develop essential English language skills with focus on reading, writing, speaking, and listening. Features storytelling and creative writing activities.",
      price: 130.00,
      rating: 4.7,
      icon: Language,
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      title: "Science",
      description: "Discover the wonders of science through simple experiments and observations. Covers basic concepts in nature, technology, and the environment.",
      price: 180.00,
      rating: 4.6,
      icon: Flask,
      color: "bg-purple-50 hover:bg-purple-100"
    },
    {
      title: "Social Studies",
      description: "Learn about our community, country, and the world. Includes interactive lessons on culture, citizenship, and basic geography.",
      price: 170.00,
      rating: 4.5,
      icon: Globe,
      color: "bg-yellow-50 hover:bg-yellow-100"
    },
    {
      title: "Setswana",
      description: "Master Setswana language skills through engaging lessons, cultural stories, and practical exercises. Features pronunciation and grammar practice.",
      price: 160.00,
      rating: 4.7,
      icon: BookOpen,
      color: "bg-orange-50 hover:bg-orange-100"
    },
    {
      title: "ICT",
      description: "Introduction to basic computer skills and digital literacy. Learn typing, basic software use, and internet safety.",
      price: 200.00,
      rating: 4.6,
      icon: Computer,
      color: "bg-cyan-50 hover:bg-cyan-100"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">PSLE Courses</h1>
            <p className="text-muted-foreground">
              Prepare for your Primary School Leaving Examination with our engaging courses
            </p>
          </div>
          <School className="h-12 w-12 text-primary" />
        </div>

        <div className="grid gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`overflow-hidden transition-all duration-300 ${course.color}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <course.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">{course.title}</h2>
                      </div>
                      <p className="text-muted-foreground">{course.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-lg">BWP {course.price.toFixed(2)}</span>
                        <div className="flex items-center gap-1">
                          <span>{course.rating}</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => setSelectedCourse(course)}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedCourse && (
        <PaymentModal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          courseName={selectedCourse.title}
          price={selectedCourse.price}
        />
      )}
    </div>
  );
};

export default PSLECourses;