import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Play, Book, Download, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import VideoPlayer from "./VideoPlayer";

interface FreeCourseProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    title: string;
    description: string;
    videos: Array<{ title: string; duration: string; url: string }>;
    notes: Array<{ title: string; url: string }>;
    documents: Array<{ title: string; url: string }>;
  };
}

const FreeCourse = ({ isOpen, onClose, course }: FreeCourseProps) => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<"videos" | "notes" | "documents">("videos");
  const [selectedVideo, setSelectedVideo] = useState<null | typeof course.videos[0]>(null);
  const [downloadingItems, setDownloadingItems] = useState<string[]>([]);

  const handleDownload = async (title: string, url: string) => {
    try {
      setDownloadingItems(prev => [...prev, title]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const link = document.createElement('a');
      link.href = url;
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Complete",
        description: `${title} has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the file.",
        variant: "destructive",
      });
    } finally {
      setDownloadingItems(prev => prev.filter(item => item !== title));
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{course.title}</DialogTitle>
            <DialogDescription>{course.description}</DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col h-full">
            <div className="flex space-x-2 mb-4">
              <Button
                variant={selectedTab === "videos" ? "default" : "outline"}
                onClick={() => setSelectedTab("videos")}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Videos
              </Button>
              <Button
                variant={selectedTab === "notes" ? "default" : "outline"}
                onClick={() => setSelectedTab("notes")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Notes
              </Button>
              <Button
                variant={selectedTab === "documents" ? "default" : "outline"}
                onClick={() => setSelectedTab("documents")}
                className="flex items-center gap-2"
              >
                <Book className="h-4 w-4" />
                Documents
              </Button>
            </div>

            <ScrollArea className="flex-1">
              {selectedTab === "videos" && (
                <div className="space-y-4">
                  {course.videos.map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent cursor-pointer"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="flex items-center gap-3">
                        <Play className="h-5 w-5" />
                        <span>{video.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{video.duration}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedTab === "notes" && (
                <div className="space-y-4">
                  {course.notes.map((note, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        <span>{note.title}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownload(note.title, note.url)}
                        disabled={downloadingItems.includes(note.title)}
                      >
                        <AnimatePresence>
                          {downloadingItems.includes(note.title) ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Check className="h-4 w-4 text-green-500" />
                            </motion.div>
                          ) : (
                            <Download className="h-4 w-4" />
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedTab === "documents" && (
                <div className="space-y-4">
                  {course.documents.map((doc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent"
                    >
                      <div className="flex items-center gap-3">
                        <Book className="h-5 w-5" />
                        <span>{doc.title}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownload(doc.title, doc.url)}
                        disabled={downloadingItems.includes(doc.title)}
                      >
                        <AnimatePresence>
                          {downloadingItems.includes(doc.title) ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Check className="h-4 w-4 text-green-500" />
                            </motion.div>
                          ) : (
                            <Download className="h-4 w-4" />
                          )}
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {selectedVideo && (
        <VideoPlayer
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          video={selectedVideo}
        />
      )}
    </>
  );
};

export default FreeCourse;