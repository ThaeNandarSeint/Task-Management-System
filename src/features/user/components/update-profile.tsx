import { Button, Modal, TextInput } from "@/components";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa";
import { baseUserSchema, UserDto } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, useUpdateProfile } from "..";
import { toast } from "@/libs/mantine-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const UpdateProfile = ({ user }: { user: User }) => {
  const [isOpen, { open, close }] = useDisclosure();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<UserDto>({
    resolver: zodResolver(baseUserSchema),
    mode: "all",
  });

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const queryClient = useQueryClient();

  const onSubmit = handleSubmit((data) => {
    updateProfile(data, {
      onSuccess: () => {
        toast.success({
          message: "Your profile is updated!",
        });
        queryClient.invalidateQueries({
          queryKey: ["user-profile"],
        });
        close();
        reset();
      },
    });
  });

  useEffect(() => {
    reset({ name: user?.name });
  }, [reset, user]);

  return (
    <>
      <FaPen className="text-blue-500 cursor-pointer" onClick={open} />
      <Modal
        title="Edit Profile"
        isOpen={isOpen}
        renderActionButton={() => (
          <Button type="submit" form="create-task-form" loading={isPending}>
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
            label="Name"
            {...register("name")}
            error={errors.name?.message}
          />
        </form>
      </Modal>
    </>
  );
};
