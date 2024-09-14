import { Button, Modal, TextInput } from "@/components";
import { useForm } from "react-hook-form";
import { Task, TaskDto, taskSchema, useCreateTask, useUpdateTask } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/libs/mantine-toast";
import { useEffect } from "react";

export const TaskForm = ({
  isOpen,
  close,
  oldData,
}: {
  isOpen: boolean;
  close: () => void;
  oldData?: Task;
}) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<TaskDto>({
    resolver: zodResolver(taskSchema),
    mode: "all",
  });

  const { mutate: createTask, isPending: isCreatePending } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdatePending } = useUpdateTask();

  const queryClient = useQueryClient();

  const onSubmit = handleSubmit((data) => {
    if (oldData) {
      updateTask(
        { id: oldData.id, ...data },
        {
          onSuccess: () => {
            toast.success({
              message: "Task is updated!",
            });
            queryClient.invalidateQueries({
              queryKey: ["tasks"],
            });
            close();
            reset();
          },
        },
      );
    } else {
      createTask(data, {
        onSuccess: () => {
          toast.success({
            message: "Task is created!",
          });
          queryClient.invalidateQueries({
            queryKey: ["tasks"],
          });
          close();
          reset();
        },
      });
    }
  });

  useEffect(() => {
    reset(oldData);
  }, [oldData, reset]);

  return (
    <Modal
      title={`${oldData ? "Edit" : "Create"} Task`}
      isOpen={isOpen}
      renderActionButton={() => (
        <Button
          type="submit"
          form="create-task-form"
          loading={oldData ? isUpdatePending : isCreatePending}
        >
          Save
        </Button>
      )}
      onClose={close}
      size="lg"
    >
      <form
        className="flex flex-col gap-5"
        onSubmit={onSubmit}
        id="create-task-form"
      >
        <TextInput
          label="Title"
          {...register("title")}
          error={errors.title?.message}
        />
      </form>
    </Modal>
  );
};
