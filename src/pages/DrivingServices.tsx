import { motion } from "framer-motion";
import { Search, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const DrivingServices = () => {
  const navigate = useNavigate();

  const educationLevels = [
    {
      title: "BGCSE",
      description: "Botswana General Certificate of Secondary Education - Your gateway to higher education. Comprehensive courses covering Mathematics, Sciences, Languages, and more. Expert-led instruction and interactive learning materials.",
      path: "/bgcse-courses",
      color: "bg-[#F2FCE2] hover:bg-[#E5F5D5]"
    },
    {
      title: "JCE",
      description: "Junior Certificate Examination - Build a strong academic foundation. Interactive lessons in core subjects, practice exercises, and personalized feedback. Prepare effectively for your JCE exams.",
      path: "/jce-courses",
      color: "bg-[#FEF7CD] hover:bg-[#F9EEB3]"
    },
    {
      title: "PSLE",
      description: "Primary School Leaving Examination - Start your educational journey right. Fun and engaging learning materials, basic concepts explained simply, and regular assessments to track progress.",
      path: "/psle-courses",
      color: "bg-[#E5DEFF] hover:bg-[#D6CFEF]"
    }
  ];

  const featuredCourses = [
    {
      title: "Mathematics BGCSE",
      image: "/lovable-uploads/b9de3ee1-4bb1-459c-9c6c-c1a37f8925da.png",
      description: "Master advanced mathematical concepts with our comprehensive BGCSE Mathematics course.",
      price: 200.00,
      rating: 4.5
    },
    {
      title: "English Language JCE",
      image: "/lovable-uploads/5300ff40-9cfb-473a-80e9-7c1f0842c731.png",
      description: "Improve your English language skills with interactive lessons and practice exercises.",
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Online Courses</h1>
          <Button 
            variant="outline" 
            className="gap-2 relative overflow-hidden group"
            onClick={() => navigate('/add-course')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-pink-500 animate-pulse" />
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </div>

        {/* Education Level Containers */}
        <div className="grid gap-4">
          {educationLevels.map((level) => (
            <Card 
              key={level.title}
              className={`${level.color} transition-colors cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200`}
              onClick={() => navigate(level.path)}
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold">{level.title}</CardTitle>
                <CardDescription className="text-gray-700">{level.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input className="pl-10" placeholder="Search for courses..." />
        </div>

        {/* Featured Courses */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Featured Courses</h2>
          <div className="grid gap-4">
            {featuredCourses.map((course, index) => (
              <Card key={index} className="overflow-hidden transform hover:-translate-y-1 transition-transform duration-200">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{course.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-primary">BWP {course.price.toFixed(2)}</span>
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
        </div>
      </motion.div>
    </div>
  );
};

export default DrivingServices;