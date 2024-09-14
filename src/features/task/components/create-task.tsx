import { IoMdAdd } from "react-icons/io";
import { TaskCard, TaskForm } from "..";
import { useDisclosure } from "@mantine/hooks";

export const CreateTask = () => {
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <>
      <TaskCard className="justify-center gap-1 cursor-pointer" onClick={open}>
        <IoMdAdd className="text-xl" />
        Add Task
      </TaskCard>
      <TaskForm isOpen={isOpen} close={close} />
    </>
  );
};
