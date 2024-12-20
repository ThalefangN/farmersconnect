import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GuideContentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  guide: {
    title: string;
    content?: string;
  };
}

const GuideContentDialog = ({ isOpen, onClose, guide }: GuideContentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>{guide.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full pr-4">
          <div className="prose prose-green">
            {guide.content || (
              <div className="space-y-4">
                <h2>Sustainable Farming Practices</h2>
                <p>
                  Sustainable farming practices are agricultural methods that protect the environment,
                  public health, human communities, and animal welfare. These practices can help
                  maintain soil fertility, reduce erosion, conserve water, and lower pollution levels.
                </p>
                <h3>Key Principles:</h3>
                <ul>
                  <li>Crop rotation and diversification</li>
                  <li>Natural pest management</li>
                  <li>Soil conservation techniques</li>
                  <li>Water management and conservation</li>
                  <li>Integration of livestock and crops</li>
                </ul>
                <h3>Benefits:</h3>
                <ul>
                  <li>Improved soil health and fertility</li>
                  <li>Reduced environmental impact</li>
                  <li>Better resource management</li>
                  <li>Enhanced biodiversity</li>
                  <li>Increased farm resilience</li>
                </ul>
                <p>
                  By implementing these practices, farmers can create a more sustainable and
                  profitable agricultural system while protecting natural resources for future
                  generations.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GuideContentDialog;