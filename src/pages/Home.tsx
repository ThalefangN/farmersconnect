import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Sprout, Users, ShoppingBag, BookOpen, MessageSquare, PawPrint, Loader2 } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const services = [
    {
      title: "Animal Tracking",
      description: "Monitor and track your livestock in real-time",
      icon: PawPrint,
      path: "/animal-tracking"
    },
    {
      title: "Forums",
      description: "Join discussions with other farmers about agriculture",
      icon: MessageSquare,
      path: "/forums"
    },
    {
      title: "Resource Sharing",
      description: "Share and access farming resources and equipment",
      icon: Sprout,
      path: "/resources"
    },
    {
      title: "Marketplace",
      description: "Buy and sell agricultural products and equipment",
      icon: ShoppingBag,
      path: "/marketplace"
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
    }
  ];

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return null;

      console.log('Searching for:', searchQuery);
      
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

  const handleResultClick = (type: string, id: string) => {
    switch (type) {
      case 'product':
        navigate(`/marketplace/products/${id}`);
        break;
      case 'equipment':
        navigate(`/marketplace/equipment/${id}`);
        break;
      case 'seed':
        navigate(`/resources/seeds/${id}`);
        break;
      case 'land':
        navigate(`/resources/land/${id}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="p-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Farmers Connect</h1>
            <p className="text-lg text-muted-foreground">
              Empowering Farmers through Collaboration and Innovation
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg h-48 mb-6">
            <img 
              src="/lovable-uploads/18a8902a-f4eb-4b86-8c45-c8914ecb854c.png"
              alt="Sebotsa Farmers"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Search for products, equipment, seeds, or land..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {searchQuery.length > 2 && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : searchResults ? (
                  <div className="p-2 space-y-2">
                    {searchResults.products.length > 0 && (
                      <div>
                        <h3 className="font-semibold px-2 py-1">Products</h3>
                        {searchResults.products.map((item) => (
                          <div
                            key={item.id}
                            className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                            onClick={() => handleResultClick('product', item.id)}
                          >
                            {item.title}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {searchResults.equipment.length > 0 && (
                      <div>
                        <h3 className="font-semibold px-2 py-1">Equipment</h3>
                        {searchResults.equipment.map((item) => (
                          <div
                            key={item.id}
                            className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                            onClick={() => handleResultClick('equipment', item.id)}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {searchResults.seeds.length > 0 && (
                      <div>
                        <h3 className="font-semibold px-2 py-1">Seeds</h3>
                        {searchResults.seeds.map((item) => (
                          <div
                            key={item.id}
                            className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                            onClick={() => handleResultClick('seed', item.id)}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {searchResults.land.length > 0 && (
                      <div>
                        <h3 className="font-semibold px-2 py-1">Land</h3>
                        {searchResults.land.map((item) => (
                          <div
                            key={item.id}
                            className="p-2 hover:bg-muted rounded-lg cursor-pointer"
                            onClick={() => handleResultClick('land', item.id)}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {Object.values(searchResults).every(arr => arr.length === 0) && (
                      <div className="p-4 text-center text-muted-foreground">
                        No results found
                      </div>
                    )}
                  </div>
                ) : null}
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