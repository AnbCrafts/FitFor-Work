import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { WorkContextProvider } from './ContextAPI/WorkContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
    <WorkContextProvider>
        <App />
    </WorkContextProvider>
      </BrowserRouter>
  </StrictMode>,
);
