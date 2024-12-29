import { motion } from "framer-motion";
import LandCard from "./LandCard";

interface LandGridProps {
  landList: any[];
  currentUserId: string | null;
  onDelete: (id: string) => void;
}

const LandGrid = ({ landList, currentUserId, onDelete }: LandGridProps) => {
  return (
    <div className="grid gap-4">
      {landList.map((land) => (
        <motion.div
          key={land.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <LandCard
            land={land}
            currentUserId={currentUserId}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default LandGrid;