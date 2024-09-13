import {
  createTheme,
  Input,
  MantineColorsTuple,
  MantineThemeOverride,
} from "@mantine/core";
import { colors } from "@/styles/colors";

export const theme: MantineThemeOverride = createTheme({
  fontFamily: "Main Font, sans-serif",
  defaultRadius: "md",
  primaryColor: "primary",
  primaryShade: 5,
  colors: {
    primary: Object.values(colors.primary) as unknown as MantineColorsTuple,
    secondary: Object.values(colors.secondary) as unknown as MantineColorsTuple,
    error: Object.values(colors.error) as unknown as MantineColorsTuple,
  },
  components: {
    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        classNames: {
          label: "font-semibold text-sm",
        },
      },
    }),
    Input: Input.extend({
      classNames: {
        input: "disabled:bg-[#f2f2f2] disabled:text-[#333]",
      },
    }),
  },
});
