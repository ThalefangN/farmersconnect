import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, ArrowLeft, Send, Loader2, Upload, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedImage(file);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !selectedImage) return;

    setIsLoading(true);
    let imageUrl = '';

    try {
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('chat_images')
          .upload(fileName, selectedImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('chat_images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const userMessage: Message = {
        role: 'user',
        content: input,
        ...(imageUrl && { imageUrl }),
      };

      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setSelectedImage(null);

      console.log('Sending request to farming-assistant function...');
      const response = await fetch(`https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.functions.supabase.co/farming-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          message: input,
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      console.log('Received response:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
      }]);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="container mx-auto px-4 py-4 flex-1 flex flex-col max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/learning')}
          className="mb-4 self-start"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Learning Hub
        </Button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Bot className="h-6 w-6 text-green-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-green-800">AI Farming Assistant</h1>
            <p className="text-green-600">Get expert farming advice and analyze your crops</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <Bot className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <p className="text-lg font-medium mb-2">Welcome to FarmersConnect AI Assistant!</p>
                <p>Ask me anything about farming in Botswana. You can also share images of your crops for analysis.</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.imageUrl && (
                      <img
                        src={message.imageUrl}
                        alt="Uploaded content"
                        className="max-w-full h-auto rounded-lg mb-2"
                      />
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="border-t p-4">
            {selectedImage && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Image className="h-4 w-4" />
                {selectedImage.name}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                >
                  Remove
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <Upload className="h-4 w-4" />
              </label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about farming in Botswana..."
                className="flex-1 min-h-[60px] max-h-[120px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className="self-end bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;