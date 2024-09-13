import { Text, Pagination } from "..";

type Props = {
  page: number;
  onChange: (page: number) => void;
  entriesPerPage?: number;
  currentEntries: number;
  totalEntries: number;
};

export const PaginationWithEntries = ({
  page,
  onChange,
  entriesPerPage = 15,
  currentEntries,
  totalEntries,
}: Props) => {
  const currentEntriesFirstIndex =
    currentEntries > 0 ? (page - 1) * entriesPerPage + 1 : 0;

  const currentEntriesLastIndex =
    currentEntries > 0 ? currentEntries + currentEntriesFirstIndex - 1 : 0;

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <Text fz={"sm"}>
          Showing {currentEntriesFirstIndex} to {currentEntriesLastIndex} of{" "}
          {totalEntries} entries
        </Text>
      </div>
      <Pagination
        value={page}
        onChange={onChange}
        total={Math.ceil(totalEntries / entriesPerPage)}
      />
    </div>
  );
};
