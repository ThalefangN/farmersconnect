import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { CreateGroupDialog } from "@/components/community/CreateGroupDialog";
import { GroupMediaUpload } from "@/components/community/GroupMediaUpload";
import { GroupList } from "@/components/community/GroupList";
import { supabase } from "@/integrations/supabase/client";
import type { Group } from "@/types/groups";

const Groups = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>();

  useEffect(() => {
    fetchGroups();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
    }
  };

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGroups(data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast({
        title: "Error",
        description: "Failed to load groups",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGroup = async (group: Group) => {
    setSelectedGroup(group);
    setShowJoinDialog(true);
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      const { error } = await supabase
        .from("groups")
        .delete()
        .eq("id", groupId);

      if (error) throw error;

      setGroups(groups.filter(g => g.id !== groupId));
      toast({
        title: "Success",
        description: "Group deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting group:", error);
      toast({
        title: "Error",
        description: "Failed to delete group",
        variant: "destructive",
      });
    }
  };

  const handleViewDiscussion = (group: Group) => {
    setSelectedGroup(group);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 space-y-6"
      >
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/community")}>
            <ArrowLeft className="h-6 w-6 text-green-700" />
          </Button>
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-green-700" />
            <h1 className="text-2xl font-bold text-green-800">Local Groups</h1>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <p className="text-gray-600 text-lg">
            Join or create local farming groups to connect with farmers in your area.
            Share knowledge, resources, and support each other.
          </p>
          <CreateGroupDialog />
        </div>

        {selectedGroup && (
          <GroupMediaUpload
            groupId={selectedGroup.id}
            onSuccess={() => setSelectedGroup(null)}
          />
        )}

        <GroupList
          groups={groups}
          onJoinGroup={handleJoinGroup}
          onDeleteGroup={handleDeleteGroup}
          onViewDiscussion={handleViewDiscussion}
          currentUserId={currentUserId}
        />
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Groups;