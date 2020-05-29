import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <main>
          <Board />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
