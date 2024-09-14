import { Button, Text, UserAvatar } from "@/components";
import { CreateTask, TaskItem, useGetTasks } from "..";
import { Loader } from "@mantine/core";
import { useAuth } from "@/features/auth";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { UpdateProfile, useGetCurrentUser } from "@/features/user";

export const TaskList = () => {
  const { ref, inView } = useInView();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetTasks();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const content =
    data &&
    data?.pages.map((page) =>
      page?.payload.tasks?.map((item, i) =>
        page?.payload.tasks?.length === i + 1 ? (
          <TaskItem item={item} key={item.id} ref={ref} />
        ) : (
          <TaskItem item={item} key={item.id} />
        ),
      ),
    );

  const { onLogout } = useAuth();

  const { data: user } = useGetCurrentUser();

  return (
    <div className="flex flex-col items-center py-9">
      <div className="flex flex-col gap-3 w-2/3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {user?.payload && (
              <>
                <UserAvatar
                  src="/images/avatar.jpg"
                  className="w-12 h-12 border-solid rounded-full border-2 border-gray-500 shadow-md"
                />
                <div>
                  <Text className="text-primary-500 font-medium">
                    {user?.payload?.name}
                  </Text>
                  <Text className="text-secondary-500 font-medium">
                    {user?.payload?.email}
                  </Text>
                </div>
                <UpdateProfile user={user?.payload} />
              </>
            )}
          </div>
          <Button onClick={onLogout}>Logout</Button>
        </div>
        <CreateTask />
        <div className="max-h-[72vh] flex flex-col gap-3 overflow-y-scroll">
          {content}
          <div className="flex justify-center">
            {(isFetchingNextPage || isLoading) && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};
