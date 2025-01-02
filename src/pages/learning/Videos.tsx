import { motion } from "framer-motion";
import { ArrowLeft, Video, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import VideoPlayer from "@/components/courses/VideoPlayer";
import { useState } from "react";

const Videos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const videos = [
    {
      title: "Modern Irrigation Techniques",
      description: "Learn about efficient water management in Botswana's climate",
      instructor: "John Anderson",
      duration: "45 minutes",
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1560493676-04071c5f467b",
      url: "https://www.youtube.com/embed/nP-nMZpLM1A",
      rating: 4.5
    },
    {
      title: "Organic Pest Control",
      description: "Natural methods for pest management in local farming",
      instructor: "Dr. Emily Parker",
      duration: "30 minutes",
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1595880500386-4b33823ea530",
      url: "https://www.youtube.com/embed/OZB_KhWZZpE",
      rating: 4.8
    },
    {
      title: "Sustainable Farming in Botswana",
      description: "Learn sustainable farming practices adapted for our climate",
      instructor: "Dr. Kgosi Molefe",
      duration: "55 minutes",
      level: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
      url: "https://www.youtube.com/embed/qn6speF_Q-E",
      rating: 4.9
    }
  ];

  const handlePlay = (video: any) => {
    setSelectedVideo(video);
    console.log("Playing video:", video.title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/learning")}>
              <ArrowLeft className="h-6 w-6 text-green-700" />
            </Button>
            <div className="flex items-center space-x-2">
              <Video className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Video Tutorials</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Farming Video Library</h2>
            <p className="text-gray-600 mb-4">
              Watch expert demonstrations and practical farming tutorials tailored for Botswana's agricultural landscape.
              Learn visual techniques for better farming practices from local and international experts.
            </p>
          </div>

          <div className="grid gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-600/90 hover:bg-green-700/90 p-6"
                      onClick={() => handlePlay(video)}
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">{video.title}</CardTitle>
                    <CardDescription className="text-green-600">{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600"><strong>Instructor:</strong> {video.instructor}</p>
                      <p className="text-gray-600"><strong>Duration:</strong> {video.duration}</p>
                      <p className="text-gray-600"><strong>Level:</strong> {video.level}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handlePlay(video)}
                      >
                        Watch Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {selectedVideo && (
        <VideoPlayer
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          video={selectedVideo}
        />
      )}
      
      <BottomNav />
    </div>
  );
};

export default Videos;