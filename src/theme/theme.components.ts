import { Components, Palette, Theme } from "@mui/material/styles";
import PoppinsMedium from "../assets/fonts/Poppins-Light.ttf"



export const getComponents = (palette: any) => ({
  MuiCssBaseline: {
    styleOverrides: `
    body {
      overflow: overlay;
      background-color: white;
    }

    @font-face {
      font-family: Poppins;
      src: url(${PoppinsMedium}) format("truetype");
      font-weight: normal;
    }
    .css-j8mouv-MuiPaper-root-MuiPickersPopper-paper {
      background-color: #999999;
    }

    .css-kzcqt2-MuiButtonBase-root-MuiPickersDay-root {
      background-color: #999999;
    }

    .css-12pusbm-MuiClockNumber-root {
      color: #ffffff;
      font-size: 0.85rem;
      font-weight: normal;
    }

    .css-j8mouv-MuiPaper-root-MuiPickersPopper-paper {
      background-color: #999999;
    }

    .css-kzcqt2-MuiButtonBase-root-MuiPickersDay-root {
      background-color: #999999;
    }
    `,
  },

  MuiIconButton: {
    styleOverrides: {
      root: {
        color: palette.text.primary,
        borderRadius: "7px",
      },
    },
  },
  MUIRichTextEditor: {
    styleOverrides: {
      root: {
        "& #mui-rte-toolbar": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          position: "fixed",
          top: "50%",
          transform: "translate(0, -50%)",
        },
        "& .MuiButtonBase-root": {
          color: "black",
          border: "1px solid #000000",
          borderRadius: "10px",
          height: "3vh",
          width: "3vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginRight: "10px",
          backgroundColor: "rgba(255,255,255, 0.5)",
        },
        "& #mui-rte-container": {
          left: "0px",
          top: "3vh",
          position: "absolute",
          width: "81vw",
        },
      },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: "contained",
    },
    styleOverrides: {
      root: {
        padding: "8px 16px",
        textTransform: "none",
        borderRadius: "7px",
        boxShadow: "none",
      },
      containedSecondary: {
        ":disabled": {
          background: "#E4CCC7",
          color: palette.text.primary,
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
      text: {
        color: palette.text.primary,
      },
    },
  },
  MuiCircularProgress: {
    styleOverrides: {
      svg: {
        color: palette.text.primary,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.borderGrey.main,
          width: "384px",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.secondary.main,
          width: "384px",
        },
        "& .MuiInputAdornment-root ": {
          position: "absolute",
          right: "30px",
          margin: "0",
          padding: "0",
        },
      },
      input: {
        background: "rgb(255, 255, 255, 0.1)",
        borderRadius: "7px",
        width: "384px",
      },
      notchedOutline: {
        borderRadius: "7px",
        border: "1.5px solid #FFFFFF",
        width: "384px",
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
