import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Book, Calculator, Language, Flask, Globe, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PaymentModal from "@/components/PaymentModal";

const BGCSECourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<{
    title: string;
    price: number;
  } | null>(null);

  const courses = [
    {
      title: "Mathematics",
      description: "Master advanced mathematical concepts with comprehensive coverage of algebra, geometry, trigonometry, and calculus. Includes practice exercises and past exam papers.",
      price: 400.00,
      rating: 4.8,
      icon: Calculator,
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      title: "English Language",
      description: "Develop strong communication skills through intensive reading, writing, speaking, and listening exercises. Features literature analysis and essay writing techniques.",
      price: 350.00,
      rating: 4.7,
      icon: Language,
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      title: "Science",
      description: "Explore physics, chemistry, and biology through interactive lessons and virtual lab experiments. Covers all major topics in the BGCSE syllabus.",
      price: 380.00,
      rating: 4.6,
      icon: Flask,
      color: "bg-purple-50 hover:bg-purple-100"
    },
    {
      title: "Geography",
      description: "Study physical and human geography with detailed case studies, map work, and field research techniques. Includes climate change and environmental impacts.",
      price: 320.00,
      rating: 4.6,
      icon: Globe,
      color: "bg-yellow-50 hover:bg-yellow-100"
    },
    {
      title: "Accounting",
      description: "Learn financial accounting principles, bookkeeping, and business analysis. Features practical exercises and real-world applications.",
      price: 350.00,
      rating: 4.7,
      icon: ChartBar,
      color: "bg-red-50 hover:bg-red-100"
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
            <h1 className="text-3xl font-bold mb-2">BGCSE Courses</h1>
            <p className="text-muted-foreground">
              Prepare for your Botswana General Certificate of Secondary Education with our comprehensive courses
            </p>
          </div>
          <Book className="h-12 w-12 text-primary" />
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

export default BGCSECourses;