import { Card } from "@/components/ui/card";
import Map from "@/components/Map";
import BottomNav from "@/components/BottomNav";

const ViewMap = () => {
  return (
    <div className="min-h-screen bg-background p-4 space-y-4 pb-16">
      <h1 className="text-2xl font-bold text-foreground">Animal Location</h1>
      
      <Card className="p-4">
        <Map />
      </Card>

      <div className="space-y-4 mt-4">
        <div className="bg-card p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Last Known Location</h2>
          <p className="text-muted-foreground">Gaborone, Botswana</p>
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ViewMap;