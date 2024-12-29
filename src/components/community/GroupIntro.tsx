import { CreateGroupDialog } from "./CreateGroupDialog";

export const GroupIntro = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <p className="text-gray-600 text-lg">
        Join or create local farming groups to connect with farmers in your area.
        Share knowledge, resources, and support each other.
      </p>
      <CreateGroupDialog />
    </div>
  );
};