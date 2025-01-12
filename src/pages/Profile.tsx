import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User, Phone, Mail, MapPin, Edit, Info } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F2FCE2] flex flex-col pb-[calc(4rem+env(safe-area-inset-bottom))]">
      <div className="p-4 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border-green-100">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl">{profile?.full_name || 'User'}</CardTitle>
                <p className="text-sm text-muted-foreground">Farmer</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
                <Settings className="h-5 w-5" />
              </Button>
            </CardHeader>
          </Card>

          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <span>{profile?.phone_text || 'No phone number'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600" />
                <span>{profile?.email || 'No email'}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-600" />
                <span>{profile?.location || 'No location'}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardContent className="pt-6">
              <Button 
                variant="outline" 
                className="w-full mb-4"
                onClick={() => navigate('/profile/edit')}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full mb-4"
                onClick={() => navigate('/about')}
              >
                <Info className="mr-2 h-4 w-4" />
                About Platform
              </Button>
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;