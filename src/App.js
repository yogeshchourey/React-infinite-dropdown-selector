import React from 'react';
import './App.css';
import { Paper, Typography } from '@material-ui/core';
import Airport from './modules/Airport/Airport';
function App() {
  return (
    <Paper className="App">
      <div className="App-header">
        <Typography variant="h3" gutterBottom>
          AIRPORTS
        </Typography>
        <Airport />
      </div>
    </Paper>
  );
}

export default App;
