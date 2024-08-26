// theme.js
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    Background: {
      deepNavy: '#0A0F2C',
    },
    HeadersFooters: {
      midnightBlue: '#1B1F3B',
    },
    MainText: {
      softWhite: '#EDEDED',
    },
    LinksButtons: {
      neonPurple: '#BB86FC',
    },
    Hover: {
      coolGray: '#2C3E50',
    },
    ErrorMessages: {
      Crimson: '#DC143C',
    },
    SuccessMessages: {
      springGreen: '#00FF7F',
    },
    WarningMessages: {
      Goldenrod: '#DAA520',
    },
  },
});

export default theme;
