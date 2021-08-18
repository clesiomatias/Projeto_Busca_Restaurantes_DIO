import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";
import theme from "./theme";
import Home from "./pages/Home";
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import store from "./redux/store";

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Reset />
                <Home />
            </ThemeProvider>
        </Provider>

    );
}

