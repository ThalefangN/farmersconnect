import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Bell, CheckCircle, AlertCircle } from "lucide-react";

interface GroupPolicyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (enableNotifications: boolean) => void;
}

export function GroupPolicyDialog({
  isOpen,
  onClose,
  onConfirm,
}: GroupPolicyDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            Group Policy Agreement
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>By joining this group, you agree to:</p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Respect all members and their opinions</li>
              <li>Share relevant and appropriate content only</li>
              <li>Maintain confidentiality of group discussions</li>
              <li>Follow community guidelines</li>
            </ul>
            <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-lg">
              <Bell className="h-5 w-5 text-green-600" />
              <p className="text-green-700">
                Would you like to receive notifications for new group posts?
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose()}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Join with Notifications
          </AlertDialogAction>
          <AlertDialogAction onClick={() => onConfirm(false)}>
            Join without Notifications
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}