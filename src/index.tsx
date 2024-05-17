import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import axios from 'axios';
import { store } from './redux/task/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { AuthProvider } from './auth/AuthInit';
import { setupAxios } from './auth/AuthHelper';

const container = document.getElementById('root') as HTMLElement;

setupAxios(axios)
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ToastContainer />
      </Provider>
    </React.StrictMode>
  )
}