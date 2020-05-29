import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hero from './components/Hero';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Hero />
        <main>
          <Board />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
