import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Group } from "@/types/groups";

interface GroupListProps {
  groups: Group[];
  onJoinGroup: (group: Group) => void;
  onDeleteGroup: (groupId: string) => void;
  onViewDiscussion: (group: Group) => void;
  currentUserId: string | undefined;
}

export const GroupList = ({ 
  groups, 
  onJoinGroup, 
  onDeleteGroup, 
  onViewDiscussion,
  currentUserId 
}: GroupListProps) => {
  return (
    <div className="grid gap-6">
      {groups.map((group) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4">
            {group.image_url && (
              <img
                src={group.image_url}
                alt={group.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold">{group.name}</h3>
            <p className="text-gray-600 mt-2">{group.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Location: {group.location}
            </p>
            {group.meeting_day && (
              <p className="text-sm text-gray-500">
                Meets: {group.meeting_day}
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <Button
                onClick={() => onJoinGroup(group)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Join Group
              </Button>
              <Button
                onClick={() => onViewDiscussion(group)}
                variant="outline"
                className="flex-1"
              >
                <Users className="mr-2 h-4 w-4" />
                Discussion
              </Button>
              {group.created_by === currentUserId && (
                <Button
                  onClick={() => onDeleteGroup(group.id)}
                  variant="destructive"
                  className="flex-1"
                >
                  Delete
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};