import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog } from "@/components/ui/dialog";
import BottomNav from "@/components/BottomNav";
import { CreateGroupDialog } from "@/components/community/CreateGroupDialog";
import { GroupMediaUpload } from "@/components/community/GroupMediaUpload";
import { supabase } from "@/integrations/supabase/client";

interface Group {
  id: string;
  name: string;
  description: string;
  location: string;
  image_url: string | null;
  created_by: string;
  meeting_day: string | null;
}

interface GroupMessage {
  id: string;
  content: string;
  media_url: string | null;
  message_type: string;
  created_at: string;
  user: {
    full_name: string;
    profile_photo_url: string | null;
  };
}

const Groups = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

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
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("group_members")
        .insert({
          group_id: group.id,
          user_id: user.id,
          location: location,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Join request sent successfully. Awaiting approval.",
      });
      setShowJoinDialog(false);
      setLocation("");
    } catch (error) {
      console.error("Error joining group:", error);
      toast({
        title: "Error",
        description: "Failed to join group",
        variant: "destructive",
      });
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

  const fetchGroupMessages = async (groupId: string) => {
    try {
      const { data, error } = await supabase
        .from("group_messages")
        .select(`
          *,
          user:profiles(full_name, profile_photo_url)
        `)
        .eq("group_id", groupId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("group_messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;

      setMessages(messages.filter(m => m.id !== messageId));
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
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

      <div className="grid gap-6 p-4">
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
                  onClick={() => {
                    setSelectedGroup(group);
                    setShowJoinDialog(true);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Join Group
                </Button>
                <Button
                  onClick={() => {
                    setSelectedGroup(group);
                    fetchGroupMessages(group.id);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Discussion
                </Button>
                {group.created_by === (supabase.auth.getUser()?.data?.user?.id || null) && (
                  <Button
                    onClick={() => handleDeleteGroup(group.id)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Join {selectedGroup?.name}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter your location"
              />
            </div>
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-sm text-yellow-800">
                By joining this group, you agree to follow the group's rules and guidelines.
                Your request will be reviewed by the group owner.
              </p>
            </div>
            <Button
              onClick={() => selectedGroup && handleJoinGroup(selectedGroup)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Submit Join Request
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={!!selectedGroup && !showJoinDialog}
        onOpenChange={() => setSelectedGroup(null)}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">{selectedGroup?.name} - Discussion</h2>
          <GroupMediaUpload
            groupId={selectedGroup?.id || ""}
            onSuccess={() => selectedGroup && fetchGroupMessages(selectedGroup.id)}
          />
          <div className="mt-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {message.user.profile_photo_url && (
                      <img
                        src={message.user.profile_photo_url}
                        alt={message.user.full_name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="font-medium">{message.user.full_name}</span>
                  </div>
                  {message.user.id === (supabase.auth.getUser()?.data?.user?.id || null) && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {message.media_url && (
                  <div className="mt-2">
                    {message.message_type === 'image' ? (
                      <img
                        src={message.media_url}
                        alt="Shared media"
                        className="w-full rounded-lg"
                      />
                    ) : (
                      <video
                        src={message.media_url}
                        controls
                        className="w-full rounded-lg"
                      />
                    )}
                  </div>
                )}
                <p className="mt-2 text-gray-600">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Groups;
