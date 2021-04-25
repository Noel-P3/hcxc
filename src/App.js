import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import { ThemeProvider } from "@material-ui/core";
import { theme1 } from './AppTheme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme1}>
        <div className="App">
          <MainComponent />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
