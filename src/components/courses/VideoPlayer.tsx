import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    url: string;
    duration: string;
    rating?: number;
    description?: string;
  };
}

const VideoPlayer = ({ isOpen, onClose, video }: VideoPlayerProps) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    // Add your video playing logic here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          {video.description && (
            <DialogDescription>{video.description}</DialogDescription>
          )}
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative aspect-video bg-black/10 rounded-lg overflow-hidden">
            {!isPlaying ? (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={handlePlayClick}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-primary/90 p-4 rounded-full"
                >
                  <Play className="h-8 w-8 text-white" />
                </motion.div>
              </div>
            ) : (
              <iframe 
                src={video.url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Duration: {video.duration}
            </span>
            {video.rating && (
              <div className="flex items-center gap-1">
                <span>{video.rating}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayer;