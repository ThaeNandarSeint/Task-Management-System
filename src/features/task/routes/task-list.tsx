import { Button } from "@/components";
import { CreateTask, TaskItem, useGetTasks } from "..";
import { Loader } from "@mantine/core";
import { useAuth } from "@/features/auth";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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

  return (
    <div className="flex flex-col items-center py-9">
      <div className="flex flex-col gap-3 w-2/3">
        <div className="flex justify-end">
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
