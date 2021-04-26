import React from 'react';
import ReactDOM from 'react-dom';
import './localReset.css';
import './index.css';
import { RecoilRoot } from 'recoil';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <CssBaseline />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
