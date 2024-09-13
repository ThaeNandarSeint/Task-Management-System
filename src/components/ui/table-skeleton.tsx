import { Skeleton } from "..";

type Props = {
  numCols?: number;
  numRows?: number;
};

export const TableSkeleton = ({ numCols = 4, numRows = 5 }: Props) => {
  return (
    <div className="rounded overflow-hidden">
      <div className="bg-brand-500 h-[50px] flex justify-around items-center">
        {Array.from({ length: numCols }).map((_, idx) => (
          <Skeleton width={106} height={14} radius="sm" key={idx} />
        ))}
      </div>
      {Array.from({ length: numRows }).map((_, idx) => (
        <div
          className="h-[50px] flex justify-around items-center odd:bg-[#f2f2f2] even:bg-white"
          key={idx}
        >
          {Array.from({ length: numCols }).map((_, idx) => (
            <Skeleton width={106} height={14} radius="sm" key={idx} />
          ))}
        </div>
      ))}
    </div>
  );
};
