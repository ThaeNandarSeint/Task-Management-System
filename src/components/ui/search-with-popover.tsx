import {
  useCombobox,
  Combobox,
  InputBase,
  CloseButton,
  ScrollArea,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { ChangeEventHandler, ReactNode } from "react";
import { Icon } from "..";

type Props = {
  data:
    | string[]
    | {
        label: string;
        value: string;
        disabled?: boolean;
      }[];

  onSelect: (value: string) => void;
  placeholder?: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
};

export const SearchWithPopover = ({
  data,
  onSelect,
  placeholder = "Select value",
  search,
  onSearchChange,
  size = "md",
  isLoading = false,
  leftIcon,
}: Props) => {
  const [_search, setSearch] = useUncontrolled({
    value: search,
    defaultValue: "",
    onChange: onSearchChange,
  });
  const combobox = useCombobox({
    scrollBehavior: "smooth",
  });

  const options = data.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item,
  );
  const shouldFilterOptions = options.every((item) => item.label !== search);
  const filteredOptions = shouldFilterOptions
    ? options.filter((item) =>
        item.label.toLowerCase().includes(_search.toLowerCase()),
      )
    : options;

  const optionsJsx = (
    <Combobox.Options mah={300} style={{ overflowY: "auto" }}>
      <ScrollArea.Autosize mah={300} type="scroll">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((opt) => (
            <Combobox.Option
              value={opt.value}
              key={opt.value}
              disabled={opt.disabled}
            >
              {opt.label}
            </Combobox.Option>
          ))
        ) : (
          <Combobox.Empty>Nothing found</Combobox.Empty>
        )}
      </ScrollArea.Autosize>
    </Combobox.Options>
  );

  const onOptionSubmit = (value: string) => {
    onSelect(value);
    combobox.closeDropdown();
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    combobox.openDropdown();
    setSearch(event.currentTarget.value);
  };

  return (
    <Combobox store={combobox} onOptionSubmit={onOptionSubmit} size={size}>
      <Combobox.Target>
        <InputBase
          size={size}
          rightSection={
            _search ? (
              <CloseButton
                onClick={() => onSelect("")}
                onMouseDown={(event) => event.preventDefault()}
                aria-label="clear search value"
              />
            ) : null
          }
          value={_search}
          onChange={onInputChange}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
          }}
          placeholder={placeholder}
          leftSection={leftIcon ?? <Icon name="magnifier" />}
          leftSectionPointerEvents="none"
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        {isLoading ? <Combobox.Empty>Loading...</Combobox.Empty> : optionsJsx}
      </Combobox.Dropdown>
    </Combobox>
  );
};
