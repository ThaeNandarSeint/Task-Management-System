import {
  CheckIcon,
  Combobox,
  Group,
  InputBase,
  ScrollArea,
  SelectProps,
  useCombobox,
} from "@mantine/core";
import { Icon } from "..";
import {
  ReactNode,
  forwardRef,
  FocusEventHandler,
  MouseEventHandler,
  useEffect,
} from "react";
import { useUncontrolled } from "@mantine/hooks";

type Props = {
  label?: ReactNode;
  data:
    | {
        label: string;
        value: string;
        disabled?: boolean;
        keywords?: string[];
      }[]
    | string[];
  onChange?: (value: string | null) => void;
  searchable?: boolean;
  className?: string;
  withCheckIcon?: boolean;
  value?: string;
  placeholder?: string;
  showRightIcon?: boolean;
  leftIcon?: ReactNode;
  withAsterisk?: boolean;
  defaultValue?: string;
  size?: SelectProps["size"];
  disabled?: boolean;
  error?: string | boolean;
  clearable?: boolean;
  allowDeselect?: boolean;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  defaultSearchValue?: string;
  readonly?: boolean;
  deselectImmediately?: boolean;
  onSelect?: (value: string) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  selectOnEnter?: boolean;
  isLoading?: boolean;
  footer?: ReactNode;
  notFoundText?: string;
  showEnterHint?: boolean;
};

export const Select = forwardRef<HTMLInputElement, Props>(
  (
    {
      data,
      showRightIcon = true,
      leftIcon,
      size = "md",
      value,
      defaultValue,
      onChange,
      clearable = false,
      searchValue,
      onSearchChange,
      searchable,
      disabled,
      readonly,
      defaultSearchValue,
      error,
      onFocus,
      onClick,
      onBlur,
      onSelect,
      deselectImmediately = false,
      selectOnEnter = false,
      allowDeselect,
      isLoading = false,
      footer,
      notFoundText = "Nothing Found",
      showEnterHint = false,
      withCheckIcon: _withCheckIcon,
      ...props
    },
    ref,
  ) => {
    const options = data.map((item) =>
      typeof item === "string"
        ? { label: item, value: item, keywords: [] }
        : item,
    );

    const optionsLockup = options.reduce(
      (
        prev: Record<
          string,
          { label: string; value: string; disabled?: boolean }
        >,
        curr,
      ) => {
        prev[curr.value] = curr;
        return prev;
      },
      {},
    );

    const [_value, setValue] = useUncontrolled({
      value,
      defaultValue,
      finalValue: null,
      onChange,
    });

    const selectedOption =
      typeof _value === "string" ? optionsLockup[_value] : undefined;

    const [_search, setSearch] = useUncontrolled({
      value: searchValue,
      defaultValue: defaultSearchValue,
      finalValue: selectedOption ? selectedOption.label : "",
      onChange: onSearchChange,
    });

    const combobox = useCombobox({
      onDropdownClose: () => {
        combobox.resetSelectedOption();
      },
      onDropdownOpen: () => {
        combobox.selectActiveOption();
        if (!selectOnEnter) {
          combobox.updateSelectedOptionIndex("active");
        }
      },
    });

    const shouldFilterOptions = options.every((item) => item.label !== _search);
    const filteredOptions = shouldFilterOptions
      ? options.filter(
          (item) =>
            item.label.toLowerCase().includes(_search.toLowerCase()) ||
            item.keywords?.some((k) =>
              k.toLowerCase().includes(_search.toLowerCase()),
            ),
        )
      : options;

    const optionsJsx = (
      <Combobox.Options>
        <ScrollArea.Autosize mah={300}>
          {isLoading ? (
            <Combobox.Empty>Loading...</Combobox.Empty>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <Combobox.Option
                value={opt.value}
                key={opt.value}
                disabled={opt.disabled}
                active={opt.value === selectedOption?.value}
                classNames={{
                  option: "group",
                }}
              >
                <Group justify="space-between">
                  <Group gap="xs">
                    {opt.value === _value && <CheckIcon size={12} />}
                    <span>{opt.label}</span>
                  </Group>
                  {showEnterHint ? (
                    <span className="text-transparent group-data-[combobox-selected]:text-white">
                      Enter
                    </span>
                  ) : null}
                </Group>
              </Combobox.Option>
            ))
          ) : (
            <Combobox.Empty>{notFoundText}</Combobox.Empty>
          )}
        </ScrollArea.Autosize>
      </Combobox.Options>
    );

    const onOptionSubmit = (v: string) => {
      if (deselectImmediately) {
        setValue(null);
        setSearch("");
        onSelect?.(v);
        combobox.closeDropdown();
      } else {
        let finalValue: string | null = v;
        if (allowDeselect) {
          finalValue = v === _value ? null : v;
        }
        const finalSearch =
          typeof finalValue === "string" ? optionsLockup[finalValue].label : "";
        setValue(finalValue);
        setSearch(finalSearch);
        combobox.updateSelectedOptionIndex("active");
        combobox.closeDropdown();
      }
    };

    const clearButton = clearable && !!_search && !disabled && !readonly && (
      <Combobox.ClearButton
        size={size}
        onClear={() => {
          setValue("");
          setSearch("");
        }}
      />
    );

    const rightSection = clearButton ? (
      clearButton
    ) : showRightIcon ? (
      <Icon name="chevronDown" />
    ) : null;

    // select first option on enter
    useEffect(() => {
      if (selectOnEnter && combobox.dropdownOpened) {
        combobox.selectFirstOption();
        combobox.updateSelectedOptionIndex();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_search, selectOnEnter, combobox.dropdownOpened]);

    // there is a loading state
    // select the first option when it's not loading
    useEffect(() => {
      if (!isLoading) {
        combobox.selectFirstOption();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    // clear search value if the prop value is null
    useEffect(() => {
      if (_value === null) {
        setSearch("");
      } else {
        setSearch(selectedOption?.label ?? "");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_value, selectedOption]);

    return (
      <Combobox
        store={combobox}
        onOptionSubmit={onOptionSubmit}
        size={size}
        withinPortal={true}
        classNames={{
          footer: "p-0",
        }}
      >
        <Combobox.Target targetType={searchable ? "input" : "button"}>
          <InputBase
            ref={ref}
            leftSection={leftIcon}
            rightSection={rightSection}
            rightSectionPointerEvents={clearButton ? "all" : "none"}
            size={size}
            disabled={disabled}
            readOnly={readonly || !searchable}
            value={_search}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
              combobox.openDropdown();
              combobox.selectFirstOption();
              combobox.updateSelectedOptionIndex("selected");
            }}
            onFocus={(event) => {
              searchable && combobox.openDropdown();
              combobox.openDropdown();
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setSearch(_value != null ? selectedOption?.label || "" : "");
              onBlur?.(event);
            }}
            onClick={(event) => {
              combobox.openDropdown();
              onClick?.(event);
            }}
            pointer={!searchable}
            error={error}
            {...props}
          />
        </Combobox.Target>
        <Combobox.Dropdown>
          {optionsJsx}
          {footer ? (
            <Combobox.Footer
              onClick={() => {
                combobox.closeDropdown();
              }}
            >
              {footer}
            </Combobox.Footer>
          ) : null}
        </Combobox.Dropdown>
      </Combobox>
    );
  },
);
