import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { setupAxios } from './routes/Request/Api';
import axios from 'axios';
import { store } from './redux/task/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const container = document.getElementById('root') as HTMLElement;

setupAxios(axios)
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </React.StrictMode>
  )
}