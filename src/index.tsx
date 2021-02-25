
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {setupRafMaterial} from "@autofiy/raf-material";
import {BrowserRouter  } from "react-router-dom";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';


setupRafMaterial();
const  them = createMuiTheme({
    palette:{

    }

})
ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={them}>
    <App />
        </ThemeProvider>
    </BrowserRouter>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
