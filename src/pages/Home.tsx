import { motion } from "framer-motion";
import { Search, Sprout, Users, ShoppingBag, BookOpen, MessageSquare, PawPrint } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AboutSection from "@/components/home/AboutSection";
import SearchResults from "@/components/home/SearchResults";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const services = [
    {
      title: "Marketplace",
      description: "Buy and sell agricultural products and equipment",
      icon: ShoppingBag,
      path: "/marketplace"
    },
    {
      title: "Resource Sharing",
      description: "Share and access farming resources and equipment",
      icon: Sprout,
      path: "/resources"
    },
    {
      title: "Forums",
      description: "Join discussions with other farmers about agriculture",
      icon: MessageSquare,
      path: "/forums"
    },
    {
      title: "Learning Hub",
      description: "Access agricultural guides and training materials",
      icon: BookOpen,
      path: "/learning"
    },
    {
      title: "Community",
      description: "Connect with other farmers in your area",
      icon: Users,
      path: "/community"
    },
    {
      title: "Animal Tracking",
      description: "Monitor and track your livestock in real-time",
      icon: PawPrint,
      path: "/animal-tracking"
    }
  ];

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return null;
      
      const [products, equipment, seeds, land] = await Promise.all([
        supabase
          .from('products')
          .select('*')
          .ilike('title', `%${searchQuery}%`)
          .limit(5),
        supabase
          .from('equipment')
          .select('*')
          .ilike('name', `%${searchQuery}%`)
          .limit(5),
        supabase
          .from('equipment')
          .select('*')
          .eq('type', 'seed')
          .ilike('name', `%${searchQuery}%`)
          .limit(5),
        supabase
          .from('equipment')
          .select('*')
          .eq('type', 'land')
          .ilike('name', `%${searchQuery}%`)
          .limit(5)
      ]);

      return {
        products: products.data || [],
        equipment: equipment.data || [],
        seeds: seeds.data || [],
        land: land.data || []
      };
    },
    enabled: searchQuery.length > 2
  });

  return (
    <div className="min-h-[100dvh] bg-[#F2FCE2] flex flex-col pb-[calc(4rem+env(safe-area-inset-bottom))]">
      <div className="p-4 space-y-6 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-green-800">Farmers Connect</h1>
            <p className="text-lg text-green-700">
              Empowering Farmers through Collaboration
            </p>
          </div>

          <div className="agriculture-card-green rounded-xl overflow-hidden shadow-lg h-48 mb-6">
            <img 
              src="/lovable-uploads/18a8902a-f4eb-4b86-8c45-c8914ecb854c.png"
              alt="Farmers Connect"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="agriculture-card-yellow p-6 rounded-lg">
            <AboutSection />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input 
              className="w-full pl-10 pr-4 py-2 agriculture-card-blue rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
              placeholder="Search for products, equipment, seeds, or land..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {searchQuery.length > 2 && searchResults && (
              <div className="agriculture-card-white mt-2">
                <SearchResults
                  products={searchResults.products}
                  equipment={searchResults.equipment}
                  seeds={searchResults.seeds}
                  land={searchResults.land}
                  onResultClick={() => setSearchQuery("")}
                />
              </div>
            )}
          </div>

          <div className="grid gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`agriculture-card-${index % 2 === 0 ? 'green' : 'yellow'}`}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
