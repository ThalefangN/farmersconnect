import { Play } from "lucide-react";

interface CourseVideoProps {
  title: string;
  duration: string;
  onClick: () => void;
}

const CourseVideo = ({ title, duration, onClick }: CourseVideoProps) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <Play className="h-5 w-5" />
        <span>{title}</span>
      </div>
      <span className="text-sm text-muted-foreground">{duration}</span>
    </div>
  );
};

export default CourseVideo;