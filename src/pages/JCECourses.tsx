import { BookOpen, GraduationCap, Library, Award } from "lucide-react";
import FeaturedCourse from "@/components/courses/FeaturedCourse";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const JCECourses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const courses = [
    {
      title: "Livestock Management",
      description: "Learn modern techniques for livestock care and management",
      price: 500,
      rating: 4.8,
      icon: BookOpen,
      color: "bg-green-100",
      image: "/lovable-uploads/b1fdcda0-68c0-4b78-9a71-bbebb1ab0560.png"
    },
    {
      title: "Crop Cultivation",
      description: "Master the art of sustainable crop farming",
      price: 450,
      rating: 4.7,
      icon: GraduationCap,
      color: "bg-blue-100",
      image: "/lovable-uploads/4b3326e6-8879-4b1b-b471-a29f6fc8e97c.png"
    },
    {
      title: "Agricultural Tools",
      description: "Understanding modern farming equipment",
      price: 400,
      rating: 4.5,
      icon: Library,
      color: "bg-yellow-100",
      image: "/lovable-uploads/5300ff40-9cfb-473a-80e9-7c1f0842c731.png"
    },
    {
      title: "Market Strategies",
      description: "Learn how to market your agricultural products",
      price: 550,
      rating: 4.9,
      icon: Award,
      color: "bg-purple-100",
      image: "/lovable-uploads/61982df0-4ff8-4103-9052-1c44eaef3477.png"
    }
  ];

  const handleEnroll = () => {
    toast({
      title: "Course Enrollment",
      description: "Please complete the enrollment process to access this course.",
    });
    navigate("/add-course");
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Agricultural Training Programs</h1>
        <p className="text-muted-foreground">
          Enhance your farming knowledge with our comprehensive courses
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <FeaturedCourse
              key={course.title}
              title={course.title}
              description={course.description}
              price={course.price}
              rating={course.rating}
              image={course.image}
              onEnroll={handleEnroll}
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default JCECourses;