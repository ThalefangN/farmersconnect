import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface FeaturedCourseProps {
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  onEnroll: () => void;
}

const FeaturedCourse = ({ 
  title, 
  description, 
  price, 
  rating, 
  image,
  onEnroll 
}: FeaturedCourseProps) => {
  return (
    <Card className="overflow-hidden transform hover:-translate-y-1 transition-transform duration-200">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium text-primary">BWP {price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <span>{rating}</span>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
        <Button className="w-full" onClick={onEnroll}>Enroll Now</Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedCourse;