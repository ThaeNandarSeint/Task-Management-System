import { Task, TaskForm } from "..";
import { useDisclosure } from "@mantine/hooks";
import { FaPen } from "react-icons/fa";

export const UpdateTask = ({ oldData }: { oldData: Task }) => {
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <>
      <div
        className="flex items-center gap-1 cursor-pointer text-blue-500"
        onClick={open}
      >
        <FaPen />
        Edit
      </div>
      <TaskForm isOpen={isOpen} close={close} oldData={oldData} />
    </>
  );
};
