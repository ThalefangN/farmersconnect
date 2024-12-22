import { motion } from "framer-motion";
import { ArrowLeft, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "@/components/BottomNav";
import CreatePostForm from "@/components/forum/CreatePostForm";
import PostsList from "@/components/forum/PostsList";

const CropCultivation = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signin');
        return;
      }
      setCurrentUser(user);

      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            full_name
          ),
          likes:likes (
            id
          ),
          comments:comments (
            id
          )
        `)
        .eq('category', 'crops')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      const postsWithLikes = await Promise.all(
        (postsData || []).map(async (post) => {
          const { data: userLike } = await supabase
            .from('likes')
            .select('id')
            .eq('post_id', post.id)
            .eq('user_id', user.id)
            .maybeSingle();

          return {
            ...post,
            isLiked: !!userLike,
            likesCount: post.likes?.length || 0,
            commentsCount: post.comments?.length || 0,
          };
        })
      );

      setPosts(postsWithLikes);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();

    const channel = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: `category=eq.crops`
        },
        () => {
          loadPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate, toast]);

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/forums")}>
              <ArrowLeft className="h-6 w-6 text-green-700" />
            </Button>
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Crop Cultivation</h1>
            </div>
          </div>
          
          <Card className="bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Share Your Thoughts</h2>
            <CreatePostForm onPostCreated={loadPosts} currentUser={currentUser} />
          </Card>

          {isLoading ? (
            <div className="text-center py-4">Loading posts...</div>
          ) : (
            <PostsList 
              posts={posts} 
              currentUser={currentUser} 
              onDeletePost={handleDeletePost} 
            />
          )}
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default CropCultivation;