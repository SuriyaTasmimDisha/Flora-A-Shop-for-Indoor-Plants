import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './assets/styles/index.css';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './Core/App';
import reportWebVitals from './reportWebVitals';
import  store from './Store/store';
import { uiTheme } from './assets/styles/theme';

ReactDOM.render(
  <Provider store={store}>
      <React.StrictMode>
        <ThemeProvider theme={uiTheme}>  
        <App />
        </ThemeProvider>
      </React.StrictMode> 
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
