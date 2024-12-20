import { motion } from "framer-motion";
import { Calendar, Clock, FileText } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const CurrentExams = () => {
  const [currentExam, setCurrentExam] = useState<null | {
    title: string;
    questions: any[];
  }>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentExams = [
    {
      title: "Mathematics Mock Test",
      subject: "Mathematics",
      dueDate: "Today",
      duration: "2 hours",
      status: "In Progress",
      questions: [
        {
          type: "multiple-choice",
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4"
        },
        {
          type: "structured",
          question: "Explain the concept of derivatives in calculus.",
        },
        {
          type: "upload",
          question: "Upload your solution to the following problem...",
        }
      ]
    },
    {
      title: "English Essay",
      subject: "English",
      dueDate: "Tomorrow",
      duration: "1.5 hours",
      status: "Not Started",
      questions: [
        {
          type: "structured",
          question: "Write an essay about your favorite book.",
        }
      ]
    }
  ];

  const handleStartExam = (exam: any) => {
    setCurrentExam(exam);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (currentExam && currentQuestionIndex < currentExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const renderQuestion = (question: any) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <RadioGroup className="space-y-4">
            {question.options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "structured":
        return (
          <Textarea 
            placeholder="Type your answer here..." 
            className="min-h-[200px]"
          />
        );
      case "upload":
        return (
          <Input 
            type="file" 
            className="cursor-pointer"
          />
        );
      default:
        return null;
    }
  };

  if (currentExam) {
    const currentQuestion = currentExam.questions[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="bg-purple-50">
            <CardHeader>
              <CardTitle>{currentExam.title}</CardTitle>
              <CardDescription>
                Question {currentQuestionIndex + 1} of {currentExam.questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium">{currentQuestion.question}</p>
              {renderQuestion(currentQuestion)}
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === currentExam.questions.length - 1}
                >
                  Next Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold">Current Exams</h1>
        <div className="grid gap-4">
          {currentExams.map((exam, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {exam.title}
                </CardTitle>
                <CardDescription>{exam.subject}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Due: {exam.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Duration: {exam.duration}</span>
                  </div>
                  <div className="mt-4">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => handleStartExam(exam)}
                    >
                      Start Exam
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CurrentExams;