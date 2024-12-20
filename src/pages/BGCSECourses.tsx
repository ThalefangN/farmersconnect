import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Book, Calculator, Languages, Beaker, Globe, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PaymentModal from "@/components/PaymentModal";
import FreeCourse from "@/components/FreeCourse";
import FeaturedCourse from "@/components/courses/FeaturedCourse";

const BGCSECourses = () => {
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
      description: "Master advanced mathematical concepts with comprehensive coverage of algebra, geometry, trigonometry, and calculus. Includes practice exercises and past exam papers.",
      price: 400.00,
      rating: 4.8,
      icon: Calculator,
      color: "bg-blue-50 hover:bg-blue-100",
      image: "/lovable-uploads/e7ea7dda-5d30-40df-8145-7a6191d1ee16.png"
    },
    {
      title: "English Language",
      description: "Develop strong communication skills through intensive reading, writing, speaking, and listening exercises. Features literature analysis and essay writing techniques.",
      price: 350.00,
      rating: 4.7,
      icon: Languages,
      color: "bg-green-50 hover:bg-green-100",
      image: "/lovable-uploads/61982df0-4ff8-4103-9052-1c44eaef3477.png"
    },
    {
      title: "Science",
      description: "Explore physics, chemistry, and biology through interactive lessons and virtual lab experiments. Covers all major topics in the BGCSE syllabus.",
      price: 380.00,
      rating: 4.6,
      icon: Beaker,
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

  const freeCourses = [
    {
      title: "Introduction to Mathematics",
      description: "Basic mathematics concepts and problem-solving techniques",
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
        },
        { 
          title: "Geometry Fundamentals", 
          duration: "18:20",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        }
      ],
      notes: [
        { title: "Mathematics Formulas", url: "/notes/math-formulas.pdf" },
        { title: "Practice Problems", url: "/notes/practice-problems.pdf" }
      ],
      documents: [
        { title: "Study Guide", url: "/docs/math-study-guide.pdf" },
        { title: "Exercise Workbook", url: "/docs/math-workbook.pdf" }
      ]
    },
    {
      title: "English Grammar Basics",
      description: "Essential English grammar rules and writing skills",
      videos: [
        { 
          title: "Parts of Speech", 
          duration: "12:15",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        },
        { 
          title: "Sentence Structure", 
          duration: "16:40",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        },
        { 
          title: "Common Grammar Rules", 
          duration: "14:55",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        }
      ],
      notes: [
        { title: "Grammar Rules Summary", url: "/notes/grammar-rules.pdf" },
        { title: "Writing Tips", url: "/notes/writing-tips.pdf" }
      ],
      documents: [
        { title: "Grammar Workbook", url: "/docs/grammar-workbook.pdf" },
        { title: "Practice Exercises", url: "/docs/grammar-exercises.pdf" }
      ]
    },
    {
      title: "Science Fundamentals",
      description: "Basic concepts in physics, chemistry, and biology",
      videos: [
        { 
          title: "Scientific Method", 
          duration: "10:25",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        },
        { 
          title: "Basic Physics Laws", 
          duration: "22:30",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        },
        { 
          title: "Chemistry Basics", 
          duration: "19:15",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        }
      ],
      notes: [
        { title: "Science Concepts", url: "/notes/science-concepts.pdf" },
        { title: "Lab Safety Guidelines", url: "/notes/lab-safety.pdf" }
      ],
      documents: [
        { title: "Science Handbook", url: "/docs/science-handbook.pdf" },
        { title: "Experiment Guide", url: "/docs/experiment-guide.pdf" }
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
            <h1 className="text-3xl font-bold mb-2">BGCSE Courses</h1>
            <p className="text-muted-foreground">
              Prepare for your Botswana General Certificate of Secondary Education with our comprehensive courses
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

export default BGCSECourses;
