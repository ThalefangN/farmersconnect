import { motion } from "framer-motion";
import { ArrowLeft, Beef, MessageSquare, Send, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";

const LivestockFarming = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState("");

  // Placeholder data for forum posts
  const forumPosts = [
    {
      id: 1,
      author: "John Farmer",
      content: "Has anyone had experience with rotational grazing for cattle? I'm looking to implement this system on my farm.",
      timestamp: "2 hours ago",
      likes: 12,
      replies: 5,
      image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a"
    },
    {
      id: 2,
      author: "Sarah Ranch",
      content: "Looking for advice on the best vaccines for young calves. What's working well for everyone?",
      timestamp: "5 hours ago",
      likes: 8,
      replies: 3,
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30"
    }
  ];

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the post to a backend
    console.log("New post:", newPost);
    setNewPost("");
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
              <Beef className="h-6 w-6 text-green-700" />
              <h1 className="text-2xl font-bold text-green-800">Livestock Farming</h1>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Start a Discussion</h2>
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <Textarea
                placeholder="Share your thoughts, questions, or experiences..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <Button variant="outline" type="button">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
                <Button type="submit">
                  <Send className="mr-2 h-4 w-4" />
                  Post
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-green-800">{post.author}</h3>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{post.content}</p>
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post attachment" 
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <Button variant="ghost" size="sm">
                      👍 {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.replies} Replies
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default LivestockFarming;