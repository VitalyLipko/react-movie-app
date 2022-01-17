import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ScrollRestoration } from './components';
import { StoreProvider } from './store';
import { CustomThemeProvider } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollRestoration />
      <CustomThemeProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
