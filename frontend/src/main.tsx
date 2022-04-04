import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import 'normalize.css/normalize.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,600;1,400&display=swap');

    body {
        color: #ffffff;
        background: #222222;
        font-family: 'Open Sans', sans-serif;
    }
`;

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyles />

        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
