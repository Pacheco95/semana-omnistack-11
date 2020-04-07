import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

import './global.css';

export default function App() {
  return (
    <>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      <Routes />
    </>
  );
}
