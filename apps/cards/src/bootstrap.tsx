import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

const rootElement = document.getElementById('app'); 
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<React.StrictMode>
      <BrowserRouter>
        <App onAddToCart={(item) => console.log("Mock Add:", item)} />
      </BrowserRouter>
    </React.StrictMode>);
}