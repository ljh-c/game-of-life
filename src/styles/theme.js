import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  typography: {
    fontFamily: ['"Noto Sans"', 'Helvetica', 'Arial', 'sans-serif'].join(', '),
  },
  palette: {
    primary: {
      main: '#3392B1'
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;