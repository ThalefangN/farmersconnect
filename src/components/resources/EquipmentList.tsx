import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Equipment {
  id: number;
  name: string;
  description: string;
  price: string;
  availability: string;
}

interface EquipmentListProps {
  equipment: Equipment[];
  onRent: (name: string) => void;
}

const EquipmentList = ({ equipment, onRent }: EquipmentListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {equipment.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">Price: {item.price}</p>
              <p className={`text-sm ${
                item.availability === "Available" ? "text-green-600" : "text-red-600"
              }`}>
                Status: {item.availability}
              </p>
              <Button
                onClick={() => onRent(item.name)}
                disabled={item.availability !== "Available"}
                className="w-full"
              >
                Rent Equipment
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EquipmentList;