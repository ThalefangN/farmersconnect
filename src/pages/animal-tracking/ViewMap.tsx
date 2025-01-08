import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin } from "lucide-react";

const ViewMap = () => {
  const { toast } = useToast();
  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("animals")
          .select(`
            *,
            animal_locations(*)
          `)
          .eq("owner_id", user.id)
          .eq("tracking_enabled", true);

        if (error) throw error;
        setAnimals(data || []);
      } catch (error) {
        console.error("Error fetching animals:", error);
        toast({
          title: "Error",
          description: "Failed to fetch animal locations",
          variant: "destructive",
        });
      }
    };

    fetchAnimals();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <MapPin className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800">Animal Locations</h1>
          <p className="text-green-600 mt-2">View your animals' current locations</p>
        </div>

        <div className="grid gap-4">
          {animals.map((animal) => (
            <Card key={animal.id}>
              <CardHeader>
                <CardTitle>{animal.name || animal.animal_id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map implementation coming soon</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Last updated: {new Date(animal.updated_at).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          {animals.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No tracked animals found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMap;