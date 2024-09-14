import { useQueryClient } from "@tanstack/react-query";
import { useUpdateTask } from "../api";
import { Task } from "../types";
import { FaCheck } from "react-icons/fa";

export const CompleteTaskButton = ({ item }: { item: Task }) => {
  const { mutate: completeTask, isPending } = useUpdateTask();

  const queryClient = useQueryClient();

  const onCompleteTask = (id: number) => {
    completeTask(
      { id, isCompleted: !item.isCompleted },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["tasks"],
          });
        },
      },
    );
  };
  return (
    <div
      className="flex items-center gap-1 cursor-pointer text-secondary-500"
      onClick={() => onCompleteTask(item.id)}
    >
      {isPending ? (
        "..."
      ) : (
        <>
          <FaCheck />
          Complete
        </>
      )}
    </div>
  );
};
