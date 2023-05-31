import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "light"
    ? {
        primary: {
          900: "#d6d5d4",
          800: "#acaaa9",
          700: "#83807d",
          600: "#595552",
          500: "#302b27",
          400: "#26221f",
          300: "#1d1a17",
          200: "#131110",
          100: "#0a0908",
        },
        light: {
          900: "#fdfdfd",
          800: "#fbfafb",
          700: "#f9f8f9",
          600: "#f7f5f7",
          500: "#f5f3f5",
          400: "#c4c2c4",
          300: "#939293",
          200: "#626162",
          100: "#313131",
        },
        secondary: {
          900: "#dbe5e8",
          800: "#b8cbd0",
          700: "#94b0b9",
          600: "#7196a1",
          500: "#4d7c8a",
          400: "#3e636e",
          300: "#2e4a53",
          200: "#1f3237",
          100: "#0f191c",
        },
      }
    : {
        primary: {
          100: "#d6d5d4",
          200: "#acaaa9",
          300: "#83807d",
          400: "#595552",
          500: "#302b27",
          600: "#26221f",
          700: "#1d1a17",
          800: "#131110",
          900: "#0a0908",
        },
        light: {
          100: "#fdfdfd",
          200: "#fbfafb",
          300: "#f9f8f9",
          400: "#f7f5f7",
          500: "#f5f3f5",
          600: "#c4c2c4",
          700: "#939293",
          800: "#626162",
          900: "#313131",
        },
        secondary: {
          100: "#dbe5e8",
          200: "#b8cbd0",
          300: "#94b0b9",
          400: "#7196a1",
          500: "#4d7c8a",
          600: "#3e636e",
          700: "#2e4a53",
          800: "#1f3237",
          900: "#0f191c",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.light[700],
              main: colors.light[500],
              light: colors.light[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.light[700],
              main: colors.light[500],
              light: colors.light[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
