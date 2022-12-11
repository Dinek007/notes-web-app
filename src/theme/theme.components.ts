import { Components, Palette, Theme } from "@mui/material/styles";

export const getComponents = (palette: Palette): Components<Theme> => ({
  MuiCssBaseline: {
    styleOverrides: `
    body {
      overflow: overlay;
      background-color: white;
    }
    `,
  },
  MuiButton: {
    defaultProps: {
      variant: "contained",
    },
    styleOverrides: {
      root: {
        padding: "8px 16px",
        textTransform: "none",
        borderRadius: "10px",
        boxShadow: "none",
      },
      containedSecondary: {
        ":disabled": {
          background: "#E4CCC7",
          color: "white",
        },
      },
      sizeSmall: {
        fontSize: "14px",
      },
      sizeMedium: {
        fontSize: "16px",
      },
      sizeLarge: {
        fontSize: "20px",
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.borderGrey.main,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.secondary.main,
        },
      },
      input: {
        padding: "0.8rem",
        background: "white",
      },
      notchedOutline: {
        borderRadius: "6px",
        borderWidth: "2px",
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
    },
    defaultProps: {
      maxWidth: false,
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        padding: "1.4rem",
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        gap: "1rem",
        fontSize: "1.2rem",
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      head: {
        backgroundColor: palette.grey[200],
        borderRadius: "12px",
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        fontFamily: "Montserrat",
      },
      head: {
        fontWeight: "bold",
        border: "none",

        "&:first-of-type": {
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8,
        },
        "&:last-of-type": {
          borderBottomRightRadius: 8,
          borderTopRightRadius: 8,
        },
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        position: "inherit",
        border: "none",
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        fontWeight: "bold",
        cursor: "pointer",
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 0,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "capitalize",

        "&.Mui-selected": {
          backgroundColor: palette.secondary.main,
          borderRadius: "12px",
        },
      },
    },
  },
});
