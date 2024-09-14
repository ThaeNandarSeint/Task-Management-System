import { IoMdAdd } from "react-icons/io";
import { TaskForm, TaskItem } from "..";
import { useDisclosure } from "@mantine/hooks";

export const CreateTask = () => {
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <>
      <TaskItem className="justify-center gap-1 cursor-pointer" onClick={open}>
        <IoMdAdd className="text-xl" />
        Add Task
      </TaskItem>
      <TaskForm isOpen={isOpen} close={close} />
    </>
  );
};
