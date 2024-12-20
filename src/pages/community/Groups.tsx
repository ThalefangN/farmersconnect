import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BottomNav from "@/components/BottomNav";
import { CreateGroupDialog } from "@/components/community/CreateGroupDialog";

const Groups = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  const groups = [
    {
      id: "1",
      title: "Balemogi Farmers",
      description: "Local farmers supporting each other in Gaborone",
      members: 156,
      location: "Gaborone",
      meetingDay: "Every Saturday",
      activities: "Crop sharing, farming techniques discussion, market access"
    },
    {
      id: "2",
      title: "Batswana Sustainable Farming",
      description: "Focus on eco-friendly farming practices",
      members: 89,
      location: "Francistown",
      meetingDay: "First Sunday of month",
      activities: "Organic farming, water conservation, soil management"
    }
  ];

  const handleJoin = (groupId: string) => {
    if (joinedGroups.includes(groupId)) {
      toast({
        title: "Already a Member",
        description: "You are already a member of this group",
      });
      return;
    }
    
    setJoinedGroups([...joinedGroups, groupId]);
    toast({
      title: "Group Joined",
      description: "You have successfully joined the group!",
    });
  };

  const handleViewDetails = (group: any) => {
    setSelectedGroup(group);
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/community")}>
              <ArrowLeft className="h-6 w-6 text-green-700" />
            </Button>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Local Groups</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Join Farming Groups</h2>
            <p className="text-gray-600 mb-4">
              Connect with local farmers in your area. Share experiences,
              knowledge, and support each other in your farming journey.
            </p>
            <CreateGroupDialog />
          </div>

          <div className="grid gap-6">
            {groups.map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">{group.title}</CardTitle>
                    <CardDescription className="text-green-600">{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600"><strong>Members:</strong> {group.members}</p>
                      <p className="text-gray-600"><strong>Location:</strong> {group.location}</p>
                      <p className="text-gray-600"><strong>Meetings:</strong> {group.meetingDay}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className={`flex-1 ${joinedGroups.includes(group.id) ? 'bg-green-200' : 'bg-green-600 hover:bg-green-700'}`}
                        onClick={() => handleJoin(group.id)}
                        disabled={joinedGroups.includes(group.id)}
                      >
                        {joinedGroups.includes(group.id) ? 'Joined' : 'Join Group'}
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => handleViewDetails(group)}>
                        View Details
                      </Button>
                      {joinedGroups.includes(group.id) && (
                        <Button variant="outline" className="flex-1">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Discussion
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedGroup?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p><strong>Description:</strong> {selectedGroup?.description}</p>
            <p><strong>Location:</strong> {selectedGroup?.location}</p>
            <p><strong>Meeting Schedule:</strong> {selectedGroup?.meetingDay}</p>
            <p><strong>Activities:</strong> {selectedGroup?.activities}</p>
            <p><strong>Current Members:</strong> {selectedGroup?.members}</p>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Groups;