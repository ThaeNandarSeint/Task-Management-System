import { DatesRangeValue } from "@mantine/dates";
import dayjs from "dayjs";
import { useCallback } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export const useBaseFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : 1;

  const start = searchParams.get("start") ?? "";
  const end = searchParams.get("end") ?? "";

  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit") as string)
    : 9;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeFalsyValues = (params: Record<string, any>) => {
    const final: URLSearchParamsInit = {};

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === "undefined" || value === null || value === "") {
        return;
      }

      final[key] = value;
    });

    return final;
  };

  const onSearch = useCallback(
    (value?: string) => {
      setSearchParams((prev) =>
        removeFalsyValues({
          ...prev,
          page: 1,
          search: value?.trim(),
          limit,
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSearchParams],
  );

  const onDateRangeChange = (value: Date[] | DatesRangeValue | null) => {
    if (value) {
      const [start, end] = value;

      if (start && end) {
        setSearchParams((prev) =>
          removeFalsyValues({
            ...prev,
            start: dayjs(start).toISOString(),
            end: dayjs(end).add(1, "days").toISOString(),
          }),
        );
      } else {
        setSearchParams((prev) =>
          removeFalsyValues({ ...prev, start: null, end: null }),
        );
      }
    }
  };

  const onPaginate = (page?: number) => {
    if (page) {
      setSearchParams(
        removeFalsyValues({
          search,
          start,
          end,
          page,
          limit,
        }),
      );
    }
  };

  const onLimitChange = (limit: number) => {
    setSearchParams(
      removeFalsyValues({
        search,
        start,
        end,
        page,
        limit,
      }),
    );
  };

  return {
    search,
    onSearch,
    onPaginate,
    page,
    limit,
    start,
    end,
    onLimitChange,
    skip: (page - 1) * limit,
    removeFalsyValues,
    onDateRangeChange,
  };
};
