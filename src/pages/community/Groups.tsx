import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { GroupList } from "@/components/community/GroupList";
import { GroupDiscussion } from "@/components/community/GroupDiscussion";
import { GroupPolicyDialog } from "@/components/community/GroupPolicyDialog";
import { GroupHeader } from "@/components/community/GroupHeader";
import { GroupIntro } from "@/components/community/GroupIntro";
import { supabase } from "@/integrations/supabase/client";
import type { Group } from "@/types/groups";

const Groups = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);
  const [selectedGroupForJoin, setSelectedGroupForJoin] = useState<Group | null>(null);

  useEffect(() => {
    fetchGroups();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUserId(user.id);
      const { data: memberGroups } = await supabase
        .from("group_members")
        .select("group_id")
        .eq("user_id", user.id)
        .eq("status", "approved")
        .maybeSingle();

      if (memberGroups) {
        const { data: group } = await supabase
          .from("groups")
          .select("*")
          .eq("id", memberGroups.group_id)
          .single();

        if (group) {
          setSelectedGroup(group);
        }
      }
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Please sign in to join groups",
          variant: "destructive",
        });
        return;
      }

      const { data: existingMembership } = await supabase
        .from("group_members")
        .select("*")
        .eq("group_id", group.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingMembership) {
        toast({
          title: "Already a member",
          description: "You are already a member of this group",
          variant: "default",
        });
        setSelectedGroup(group);
        return;
      }

      setSelectedGroupForJoin(group);
      setShowPolicyDialog(true);
    } catch (error) {
      console.error("Error joining group:", error);
      toast({
        title: "Error",
        description: "Failed to join group",
        variant: "destructive",
      });
    }
  };

  const handlePolicyConfirm = async (enableNotifications: boolean) => {
    if (!selectedGroupForJoin || !currentUserId) return;

    try {
      const { error } = await supabase
        .from("group_members")
        .insert({
          group_id: selectedGroupForJoin.id,
          user_id: currentUserId,
          role: "member",
          status: "approved"
        });

      if (error) throw error;

      if (enableNotifications) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            notification_preferences: {
              group_posts: true
            }
          })
          .eq("id", currentUserId);

        if (updateError) throw updateError;
      }

      toast({
        title: "Success",
        description: "You have successfully joined the group",
      });

      setSelectedGroup(selectedGroupForJoin);
    } catch (error) {
      console.error("Error confirming group join:", error);
      toast({
        title: "Error",
        description: "Failed to join group",
        variant: "destructive",
      });
    } finally {
      setShowPolicyDialog(false);
      setSelectedGroupForJoin(null);
    }
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

  const handleBack = () => {
    if (selectedGroup) {
      setSelectedGroup(null);
    } else {
      navigate("/community");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 space-y-6"
      >
        <GroupHeader 
          selectedGroup={selectedGroup} 
          onBack={handleBack}
        />

        {!selectedGroup ? (
          <>
            <GroupIntro />
            <GroupList
              groups={groups}
              onJoinGroup={handleJoinGroup}
              onDeleteGroup={handleDeleteGroup}
              onViewDiscussion={setSelectedGroup}
              currentUserId={currentUserId}
            />
          </>
        ) : (
          <GroupDiscussion 
            groupId={selectedGroup.id} 
            currentUserId={currentUserId}
          />
        )}
      </motion.div>
      <BottomNav />
      <GroupPolicyDialog
        isOpen={showPolicyDialog}
        onClose={() => {
          setShowPolicyDialog(false);
          setSelectedGroupForJoin(null);
        }}
        onConfirm={handlePolicyConfirm}
      />
    </div>
  );
};

export default Groups;