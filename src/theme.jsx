import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Color Design Tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      primary: {
        100: "#d0d1d2",
        200: "#a1a4a6",
        300: "#727679",
        400: "#43494d",
        500: "#141b2d", // Dark Blue/Slate background
        600: "#101624",
        700: "#0c101b",
        800: "#080b12",
        900: "#040509",
      },
      greenAccent: {
        100: "#dbf5ee",
        200: "#b7ebde",
        300: "#94e2cd",
        400: "#70d8bd",
        500: "#4cceac",
        600: "#3da58a",
        700: "#2e7c67",
        800: "#1f5245",
        900: "#0f2922",
      },
      redAccent: {
        100: "#f8dcdb",
        200: "#f1b9b7",
        300: "#e99592",
        400: "#e2726e",
        500: "#db4f4a",
        600: "#af3f3b",
        700: "#832f2c",
        800: "#58201e",
        900: "#2c100f",
      },
      blueAccent: {
        100: "#e1e2fe",
        200: "#c3c6fd",
        300: "#a4a9fc",
        400: "#868dfb",
        500: "#6870fa",
        600: "#535ac8",
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632",
      },
      grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#4d4d4d",
        700: "#333333",
        800: "#1a1a1a",
        900: "#141b2d", // Matching primary 500
      },
    }
    : {
      primary: {
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#101624",
        500: "#141b2d",
        600: "#43494d",
        700: "#727679",
        800: "#a1a4a6",
        900: "#d0d1d2",
      },
      greenAccent: {
        100: "#0f2922",
        200: "#1f5245",
        300: "#2e7c67",
        400: "#3da58a",
        500: "#4cceac",
        600: "#70d8bd",
        700: "#94e2cd",
        800: "#b7ebde",
        900: "#dbf5ee",
      },
      redAccent: {
        100: "#2c100f",
        200: "#58201e",
        300: "#832f2c",
        400: "#af3f3b",
        500: "#db4f4a",
        600: "#e2726e",
        700: "#e99592",
        800: "#f1b9b7",
        900: "#f8dcdb",
      },
      blueAccent: {
        100: "#151632",
        200: "#2a2d64",
        300: "#3e4396",
        400: "#535ac8",
        500: "#6870fa",
        600: "#868dfb",
        700: "#a4a9fc",
        800: "#c3c6fd",
        900: "#e1e2fe",
      },
      grey: {
        100: "#141b2d",
        200: "#1a1a1a",
        300: "#333333",
        400: "#4d4d4d",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },
    }),
});

// MUI Theme Settings
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
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.primary[500],
            paper: colors.primary[400],
          },
        }
        : {
          // palette values for light mode
          primary: {
            main: colors.primary[100],
          },
          secondary: {
            main: colors.greenAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: "#fcfcfc",
            paper: "#ffffff",
          },
        }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Merriweather", "serif"].join(","),
        fontSize: 40,
        fontWeight: 700,
      },
      h2: {
        fontFamily: ["Merriweather", "serif"].join(","),
        fontSize: 32,
        fontWeight: 700,
      },
      h3: {
        fontFamily: ["Merriweather", "serif"].join(","),
        fontSize: 24,
        fontWeight: 700,
      },
      h4: {
        fontFamily: ["Merriweather", "serif"].join(","),
        fontSize: 20,
        fontWeight: 700,
      },
      h5: {
        fontFamily: ["Merriweather", "serif"].join(","),
        fontSize: 16,
        fontWeight: 700,
      },
      h6: {
        fontFamily: ["Merriweather", "serif"].join(","),
        fontSize: 14,
        fontWeight: 700,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
          },
        },
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
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
