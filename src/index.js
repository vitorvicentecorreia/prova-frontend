import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TreeContextProvider } from './context/tree'

ReactDOM.render(
  <React.StrictMode>
    <TreeContextProvider>
      <App />
    </TreeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
