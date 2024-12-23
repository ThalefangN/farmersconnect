import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ListSeedsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const ListSeedsDialog = ({ isOpen, onClose, onSubmit }: ListSeedsDialogProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>List Your Seeds</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Seed Name</Label>
            <Input id="name" name="name" placeholder="Enter seed name" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Describe your seeds" 
              required 
            />
          </div>
          <Button type="submit" className="w-full">Submit Listing</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListSeedsDialog;