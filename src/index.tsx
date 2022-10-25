import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {setupRafMaterial} from "@autofiy/raf-material";
import {BrowserRouter  } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Provider} from 'react-redux';
import Store from "./Store/Store";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


setupRafMaterial();
const  them = createMuiTheme({
    typography:{
        fontSize:22
    },
    direction : "rtl",
    spacing: 10
})

ReactDOM.render(
    <BrowserRouter>
        <Provider store={Store}>
            <StylesProvider jss={jss}>

            <ThemeProvider theme={them}>
    <App />
        </ThemeProvider>
                </StylesProvider>
        </Provider>
    </BrowserRouter>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
