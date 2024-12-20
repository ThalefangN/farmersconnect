import { motion } from "framer-motion";
import { GraduationCap, ArrowLeft, BookOpen, Award, Library, Clock, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Permits = () => {
  const navigate = useNavigate();

  const programs = [
    {
      title: "BGCSE Program",
      description: "Botswana General Certificate of Secondary Education",
      features: [
        {
          icon: BookOpen,
          title: "Core Subjects",
          description: "Mathematics, English, Science, Agriculture, and more"
        },
        {
          icon: Clock,
          title: "Duration",
          description: "2-year program with flexible learning options"
        },
        {
          icon: Target,
          title: "Learning Outcomes",
          description: "Comprehensive preparation for higher education"
        }
      ]
    },
    {
      title: "JCE Program",
      description: "Junior Certificate Examination",
      features: [
        {
          icon: BookOpen,
          title: "Core Subjects",
          description: "Basic Mathematics, English, Integrated Science"
        },
        {
          icon: Users,
          title: "Support",
          description: "Dedicated tutors and study groups"
        },
        {
          icon: Library,
          title: "Resources",
          description: "Interactive content and practice materials"
        }
      ]
    },
    {
      title: "PSLE Program",
      description: "Primary School Leaving Examination",
      features: [
        {
          icon: BookOpen,
          title: "Core Subjects",
          description: "Mathematics, English, Science, Setswana"
        },
        {
          icon: Award,
          title: "Achievement",
          description: "Foundation for academic excellence"
        },
        {
          icon: Target,
          title: "Goals",
          description: "Building essential learning skills"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Academic Programs
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive educational programs designed for student success
          </p>
        </div>

        <div className="grid gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{program.title}</h2>
              <p className="text-muted-foreground mb-4">{program.description}</p>
              
              <div className="grid gap-4">
                {program.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full mt-4"
                onClick={() => navigate(`/${program.title.split(' ')[0].toLowerCase()}-courses`)}
              >
                Explore Courses
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Permits;