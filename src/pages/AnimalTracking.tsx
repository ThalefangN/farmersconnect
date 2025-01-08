import { MapPin, PawPrint, Locate, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import BottomNav from "@/components/BottomNav";

const AnimalTracking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-16">
      <div className="p-4 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <PawPrint className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-800">Animal Tracking</h1>
          <p className="text-lg text-green-700">
            Monitor and manage your livestock efficiently
          </p>
        </div>

        <div className="grid gap-4">
          <Card className="border-green-100">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Locate className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <CardTitle className="text-lg text-green-800">Live Location</CardTitle>
                  <CardDescription className="text-green-600">Track your animals in real-time</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full border-green-200 text-green-700 hover:bg-green-50"
              >
                <Map className="mr-2 h-4 w-4" />
                View Map
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <CardTitle className="text-lg text-green-800">Movement History</CardTitle>
                  <CardDescription className="text-green-600">View past locations and patterns</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full border-green-200 text-green-700 hover:bg-green-50"
              >
                View History
              </Button>
            </CardContent>
          </Card>

          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Coming soon: Advanced tracking features including geofencing, health monitoring, and more!
            </p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default AnimalTracking;