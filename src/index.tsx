import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { setupAxios } from './routes/Request/Api';
import axios from 'axios';

const container = document.getElementById('root') as HTMLElement;

setupAxios(axios)
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}