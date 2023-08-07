import { createTheme } from "@mui/material";
import { BIZ_UDPGothic } from "next/font/google";

const bizUdPGothic = BIZ_UDPGothic({
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

/**
 * MUIのテーマ設定です
 */
export const theme = createTheme({
  typography: {
    h1: {
      fontSize: 32,
    },
    h2: {
      fontSize: 24,
    },
    h3: {
      fontSize: 18,
    },
    h4: {
      fontSize: 14,
    },
    fontFamily: [bizUdPGothic.style.fontFamily, "sans-serif"].join(","),
  },
  shape: {
    borderRadius: 8,
  },
});
