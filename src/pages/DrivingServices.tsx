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
      description: "Botswana General Certificate of Secondary Education",
      path: "/bgcse-courses"
    },
    {
      title: "JCE",
      description: "Junior Certificate Examination",
      path: "/jce-courses"
    },
    {
      title: "PSLE",
      description: "Primary School Leaving Examination",
      path: "/psle-courses"
    }
  ];

  const featuredCourses = [
    {
      title: "Mathematics BGCSE",
      image: "/lovable-uploads/18a8902a-f4eb-4b86-8c45-c8914ecb854c.png",
      price: 200.00,
      rating: 4.5
    },
    {
      title: "English Language JCE",
      image: "/lovable-uploads/18a8902a-f4eb-4b86-8c45-c8914ecb854c.png",
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
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </div>

        {/* Education Level Containers */}
        <div className="grid gap-4">
          {educationLevels.map((level) => (
            <Card 
              key={level.title}
              className="hover:bg-accent transition-colors cursor-pointer"
              onClick={() => navigate(level.path)}
            >
              <CardHeader>
                <CardTitle>{level.title}</CardTitle>
                <CardDescription>{level.description}</CardDescription>
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
              <Card key={index} className="overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{course.title}</h3>
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
        </div>
      </motion.div>
    </div>
  );
};

export default DrivingServices;