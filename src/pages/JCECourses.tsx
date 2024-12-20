import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Book, Calculator, Languages, Beaker, Globe, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PaymentModal from "@/components/PaymentModal";
import FreeCourse from "@/components/FreeCourse";
import FeaturedCourse from "@/components/courses/FeaturedCourse";

const JCECourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<{
    title: string;
    price: number;
  } | null>(null);

  const [selectedFreeCourse, setSelectedFreeCourse] = useState<{
    title: string;
    description: string;
    videos: Array<{ title: string; duration: string; url: string }>;
    notes: Array<{ title: string; url: string }>;
    documents: Array<{ title: string; url: string }>;
  } | null>(null);

  const courses = [
    {
      title: "Mathematics",
      description: "Improve your math skills with comprehensive coverage of arithmetic, algebra, and geometry. Includes interactive problem-solving exercises.",
      price: 250.00,
      rating: 4.5,
      icon: Calculator,
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      title: "English Language",
      description: "Enhance your English language skills through reading comprehension, grammar, and writing exercises. Features vocabulary building and communication practice.",
      price: 220.00,
      rating: 4.6,
      icon: Languages,
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      title: "Science",
      description: "Explore basic science concepts through hands-on experiments and interactive lessons. Covers physics, chemistry, and biology fundamentals.",
      price: 280.00,
      rating: 4.7,
      icon: Beaker,
      color: "bg-purple-50 hover:bg-purple-100"
    },
    {
      title: "Social Studies",
      description: "Learn about Botswana's history, geography, and civic education. Includes case studies and current affairs discussions.",
      price: 230.00,
      rating: 4.6,
      icon: Globe,
      color: "bg-yellow-50 hover:bg-yellow-100"
    }
  ];

  const freeCourses = [
    {
      title: "Basic Mathematics",
      description: "Introduction to fundamental mathematical concepts",
      videos: [
        { 
          title: "Numbers and Operations", 
          duration: "15:30",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        },
        { 
          title: "Basic Algebra", 
          duration: "20:45",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        }
      ],
      notes: [
        { title: "Mathematics Basics", url: "/notes/math-basics.pdf" },
        { title: "Practice Problems", url: "/notes/practice-problems.pdf" }
      ],
      documents: [
        { title: "Study Guide", url: "/docs/math-study-guide.pdf" },
        { title: "Exercise Workbook", url: "/docs/math-workbook.pdf" }
      ]
    },
    {
      title: "English Fundamentals",
      description: "Basic English language skills and grammar",
      videos: [
        { 
          title: "Basic Grammar", 
          duration: "12:15",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        },
        { 
          title: "Reading Skills", 
          duration: "16:40",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        }
      ],
      notes: [
        { title: "Grammar Rules", url: "/notes/grammar-rules.pdf" },
        { title: "Reading Tips", url: "/notes/reading-tips.pdf" }
      ],
      documents: [
        { title: "English Workbook", url: "/docs/english-workbook.pdf" },
        { title: "Practice Exercises", url: "/docs/english-exercises.pdf" }
      ]
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
            <h1 className="text-3xl font-bold mb-2">JCE Courses</h1>
            <p className="text-muted-foreground">
              Prepare for your Junior Certificate Examination with our comprehensive courses
            </p>
          </div>
          <Book className="h-12 w-12 text-primary" />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Premium Courses</h2>
            <div className="grid gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeaturedCourse
                    title={course.title}
                    description={course.description}
                    price={course.price}
                    rating={course.rating}
                    image={course.image}
                    onEnroll={() => setSelectedCourse(course)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Free Courses</h2>
            <div className="grid gap-6">
              {freeCourses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden transition-all duration-300 bg-accent/50 hover:bg-accent">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-4 flex-1">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Book className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-xl font-semibold">{course.title}</h2>
                          </div>
                          <p className="text-muted-foreground">{course.description}</p>
                          <Button 
                            className="w-full"
                            variant="outline"
                            onClick={() => setSelectedFreeCourse(course)}
                          >
                            Start Learning
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
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

      {selectedFreeCourse && (
        <FreeCourse
          isOpen={!!selectedFreeCourse}
          onClose={() => setSelectedFreeCourse(null)}
          course={selectedFreeCourse}
        />
      )}
    </div>
  );
};

export default JCECourses;
