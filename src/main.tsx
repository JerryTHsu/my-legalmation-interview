// src/main.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import store from './store/index';
import App from './App';
import GlobalStyle from './GlobalStyle';
import { makeServer } from './mirage/config'; // Import the MirageJS server

// Start MirageJS server in development mode
if (process.env.NODE_ENV === 'development') {
    makeServer();
}

// Use createRoot instead of ReactDOM.render
const container = document.getElementById('root');
const root = createRoot(container!);

// Render your app inside createRoot
root.render(
    <Provider store={store}>
        <GlobalStyle />
        <App />
    </Provider>
);