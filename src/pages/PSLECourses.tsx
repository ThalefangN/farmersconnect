<lov-code>
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
      description: "Fundamental English