import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Equipment {
  id: string;
  name: string;
  description: string | null;
  price: string;
  type: 'rent' | 'sale';
  status: string;
  owner: {
    name: string | null;
    phone?: string | null;
  };
}

interface EquipmentListProps {
  equipment: Equipment[];
  onRent: (equipment: Equipment) => void;
}

const EquipmentList = ({ equipment, onRent }: EquipmentListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {equipment.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </div>
              <Badge variant={item.type === 'rent' ? 'secondary' : 'default'}>
                {item.type === 'rent' ? 'For Rent' : 'For Sale'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">Price: {item.price}</p>
              <p className="text-sm">Owner: {item.owner.name}</p>
              <p className={`text-sm ${
                item.status === "Available" ? "text-green-600" : "text-red-600"
              }`}>
                Status: {item.status}
              </p>
              <Button
                onClick={() => onRent(item)}
                disabled={item.status !== "Available"}
                className="w-full"
              >
                {item.type === 'rent' ? 'Request to Rent' : 'Request to Buy'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EquipmentList;