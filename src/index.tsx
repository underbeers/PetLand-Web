import React from 'react';
import ReactDOM from 'react-dom/client';

import './reset.css';
import './index.css';

import HomePage from "./pages/HomePage/HomePage";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);

reportWebVitals();
