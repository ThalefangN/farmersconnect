import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { History } from "lucide-react";

const ViewHistory = () => {
  const { toast } = useToast();
  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
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
        console.error("Error fetching history:", error);
        toast({
          title: "Error",
          description: "Failed to fetch movement history",
          variant: "destructive",
        });
      }
    };

    fetchHistory();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <History className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800">Movement History</h1>
          <p className="text-green-600 mt-2">Track your animals' movement patterns</p>
        </div>

        <div className="grid gap-4">
          {animals.map((animal) => (
            <Card key={animal.id}>
              <CardHeader>
                <CardTitle>{animal.name || animal.animal_id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {animal.animal_locations && animal.animal_locations.length > 0 ? (
                    animal.animal_locations.map((location: any) => (
                      <div
                        key={location.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <p className="text-sm text-gray-600">
                          Location: ({location.latitude}, {location.longitude})
                        </p>
                        <p className="text-sm text-gray-500">
                          Time: {new Date(location.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No movement history available
                    </p>
                  )}
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

export default ViewHistory;