import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PastExams = () => {
  const pastExams = [
    {
      year: "2023",
      papers: [
        { title: "Mathematics Paper 1", size: "2.3 MB" },
        { title: "English Language Paper 2", size: "1.8 MB" },
        { title: "Science Combined Paper", size: "3.1 MB" }
      ]
    },
    {
      year: "2022",
      papers: [
        { title: "Mathematics Final Exam", size: "2.1 MB" },
        { title: "English Comprehension", size: "1.5 MB" },
        { title: "Biology Paper 1", size: "2.8 MB" }
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
        <h1 className="text-2xl font-bold">Past Exam Papers</h1>
        <div className="grid gap-6">
          {pastExams.map((yearGroup) => (
            <div key={yearGroup.year} className="space-y-4">
              <h2 className="text-xl font-semibold">{yearGroup.year} Papers</h2>
              <div className="grid gap-4">
                {yearGroup.papers.map((paper, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow bg-blue-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="h-5 w-5 text-primary" />
                        {paper.title}
                      </CardTitle>
                      <CardDescription>File size: {paper.size}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Paper
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PastExams;