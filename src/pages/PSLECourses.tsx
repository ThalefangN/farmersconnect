import { useState } from "react";
import { motion } from "framer-motion";
import { Star, School, Calculator, Languages, Beaker, Globe, BookOpen, Computer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PaymentModal from "@/components/PaymentModal";
import FreeCourse from "@/components/FreeCourse";

const PSLECourses = () => {
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
      icon: Languages,
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      title: "Science",
      description: "Discover the wonders of science through simple experiments and observations. Covers basic concepts in nature, technology, and the environment.",
      price: 180.00,
      rating: 4.6,
      icon: Beaker,
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

  const freeCourses = [
    {
      title: "Introduction to Mathematics",
      description: "Basic mathematics for primary school students",
      videos: [
        { 
          title: "Basic Numbers", 
          duration: "10:30",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        },
        { 
          title: "Simple Addition", 
          duration: "15:45",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        }
      ],
      notes: [
        { title: "Math Basics", url: "/notes/primary-math.pdf" },
        { title: "Practice Sheets", url: "/notes/practice-sheets.pdf" }
      ],
      documents: [
        { title: "Study Guide", url: "/docs/primary-guide.pdf" },
        { title: "Workbook", url: "/docs/primary-workbook.pdf" }
      ]
    },
    {
      title: "Basic English",
      description: "Fundamental English language skills",
      videos: [
        { 
          title: "Alphabet Sounds", 
          duration: "12:20",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        },
        { 
          title: "Basic Vocabulary", 
          duration: "15:10",
          url: "https://youtu.be/QpDyxlCclMk?si=IWk1hAfa3UKFmlz2"
        }
      ],
      notes: [
        { title: "English Basics", url: "/notes/english-basics.pdf" },
        { title: "Vocabulary List", url: "/notes/vocabulary.pdf" }
      ],
      documents: [
        { title: "Learning Guide", url: "/docs/english-guide.pdf" },
        { title: "Practice Book", url: "/docs/practice-book.pdf" }
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
            <h1 className="text-3xl font-bold mb-2">PSLE Courses</h1>
            <p className="text-muted-foreground">
              Prepare for your Primary School Leaving Examination with our comprehensive courses
            </p>
          </div>
          <School className="h-12 w-12 text-primary" />
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
                  <Card className={`overflow-hidden transition-all duration-300 ${course.color}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-4 flex-1">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <course.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">{course.title}</h3>
                              <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm text-muted-foreground ml-1">{course.rating}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{course.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">P{course.price.toFixed(2)}</span>
                            <Button onClick={() => setSelectedCourse(course)}>
                              Enroll Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                              <School className="h-6 w-6 text-primary" />
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

export default PSLECourses;