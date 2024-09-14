import { Text } from "@/components";
import { forwardRef, LegacyRef } from "react";
import {
  CompleteTaskButton,
  DeleteTaskButton,
  Task,
  TaskCard,
  UpdateTask,
} from "..";

export const TaskItem = forwardRef(
  (
    {
      item,
    }: {
      item: Task;
    },
    ref: LegacyRef<HTMLDivElement> | undefined,
  ) => {
    const itemContent = (
      <TaskCard>
        <Text className={item.isCompleted ? "line-through" : ""}>
          {item.title}
        </Text>
        <div className="flex gap-4">
          {!item.isCompleted && <CompleteTaskButton item={item} />}
          <UpdateTask oldData={item} />
          <DeleteTaskButton item={item} />
        </div>
      </TaskCard>
    );

    const content = ref ? (
      <div ref={ref}>{itemContent}</div>
    ) : (
      <div>{itemContent}</div>
    );
    return content;
  },
);

// export const TaskItem = ({
//   children,
//   className,
//   onClick,
// }: {
//   children: ReactNode;
//   className?: string;
//   onClick?: () => void;
// }) => {
//   return (
//     <div
//       className={cn(
//         "w-full p-3 rounded-lg text-black font-medium flex justify-between items-center bg-white shadow-md",
//         className,
//       )}
//       onClick={onClick}
//     >
//       {children}
//     </div>
//   );
// };
