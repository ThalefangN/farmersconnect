import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Phone, Shield, LogOut, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Card, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProfilePhotoUpload from "@/components/profile/ProfilePhotoUpload";
import PasswordResetDialog from "@/components/profile/PasswordResetDialog";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        console.log('Loading user profile...');
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log('No user found, redirecting to signin');
          navigate('/signin');
          return;
        }

        setUserEmail(user.email);
        console.log('User email set:', user.email);

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }
        
        console.log('Profile loaded:', profile);
        setUserProfile(profile);
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      }
    };

    loadProfile();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpdated = (url: string) => {
    console.log('Profile photo updated:', url);
    setUserProfile(prev => ({ ...prev, profile_photo_url: url }));
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Farmer Profile</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center space-y-4"
        >
          {userProfile && (
            <ProfilePhotoUpload
              currentPhotoUrl={userProfile.profile_photo_url}
              userId={userProfile.id}
              onPhotoUpdated={handlePhotoUpdated}
            />
          )}
          <div className="text-center">
            <h2 className="text-xl font-semibold">{userProfile?.full_name}</h2>
            <p className="text-muted-foreground">{userProfile?.farming_type} Farmer</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          <div className="grid gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{userEmail}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{userProfile?.phone_text || "Not set"}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{userProfile?.location}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setShowPasswordDialog(true)}
              >
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span>Change Password</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={handleSignOut}
              >
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                    <span>Sign Out</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <PasswordResetDialog
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
      />
      
      <BottomNav />
    </div>
  );
};

export default Profile;