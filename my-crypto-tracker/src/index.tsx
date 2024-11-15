import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './stores';

type RootElement = HTMLElement | null;

const rootElement: RootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </React.StrictMode>
    </Provider>
  );
}

