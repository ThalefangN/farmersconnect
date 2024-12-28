import { motion } from "framer-motion";
import EquipmentCard from "@/components/marketplace/EquipmentCard";

interface Equipment {
  id: string;
  name: string;
  description: string | null;
  price: string;
  type: string;
  status: string;
  location: string;
  image_url: string | null;
  owner: {
    full_name: string | null;
    phone_text: string | null;
  };
  owner_id: string;
}

interface EquipmentGridProps {
  equipment: Equipment[];
  currentUserId: string | null;
  onDelete: (id: string) => void;
}

const EquipmentGrid = ({ equipment, currentUserId, onDelete }: EquipmentGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipment.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EquipmentCard
            equipment={item}
            currentUserId={currentUserId}
            onDelete={() => onDelete(item.id)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default EquipmentGrid;