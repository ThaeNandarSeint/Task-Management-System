import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTask } from "../api";
import { Task } from "../types";
import { MdDelete } from "react-icons/md";

export const DeleteTaskButton = ({ item }: { item: Task }) => {
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
    <div
      className="flex items-center gap-1 cursor-pointer text-primary-500"
      onClick={() => onDeleteTask(item.id)}
    >
      {isPending ? (
        "..."
      ) : (
        <>
          <MdDelete />
          Delete
        </>
      )}
    </div>
  );
};
