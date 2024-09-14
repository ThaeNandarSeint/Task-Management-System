import { Text } from "@/components";
import { MdDelete } from "react-icons/md";
import { CreateTask, TaskItem, UpdateTask, useDeleteTask } from "..";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "@mantine/core";

const tasks = [
  { id: 1, title: "Wash Clothes", isCompleted: false },
  { id: 2, title: "Clean Kitchen", isCompleted: true },
];

export const TaskList = () => {
  const { mutate: deleteTask, isPending } = useDeleteTask();

  const queryClient = useQueryClient();

  const onDeleteTask = (id: number) => {
    deleteTask(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-3 pt-16">
      <CreateTask />
      {tasks.map((item) => (
        <TaskItem key={item.id}>
          <Text className={item.isCompleted ? "line-through" : ""}>
            {item.title}
          </Text>
          <div className="flex gap-4">
            <UpdateTask oldData={item} />
            {isPending ? (
              <Loader />
            ) : (
              <div
                className="flex items-center gap-1 cursor-pointer text-primary-500"
                onClick={() => onDeleteTask(item.id)}
              >
                <MdDelete />
                Delete
              </div>
            )}
          </div>
        </TaskItem>
      ))}
    </div>
  );
};
