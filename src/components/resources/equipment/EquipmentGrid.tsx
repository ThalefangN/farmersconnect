import { motion } from "framer-motion";
import EquipmentCard from "@/components/marketplace/EquipmentCard";
import { Equipment } from "@/types/equipment";

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