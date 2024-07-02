import "./main.module.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/nprogress/styles.css";

import {
    Loader,
    MantineProvider,
    createTheme,
    localStorageColorSchemeManager,
} from "@mantine/core";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store from "./redux/store/store.js";

const colorSchemeManager = localStorageColorSchemeManager({
    key: "adpem-color-scheme",
});

const theme = createTheme({
    defaultColorScheme: "dark",
    fontFamily: "Verdana, sans-serif",
    fontFamilyMonospace: "Monaco, Courier, monospace",
    headings: { fontFamily: "Greycliff CF, sans-serif" },
    primaryShade: { light: 7 },
    components: {
        Loader: Loader.extend({
            defaultProps: {
                type: "bars",
            },
        }),
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
        <Provider store={store}>
            <BrowserRouter>
                <ParallaxProvider>
                    <Notifications position="top-right" limit={3} />
                    <NavigationProgress />
                    <App />
                </ParallaxProvider>
            </BrowserRouter>
        </Provider>
    </MantineProvider>
);
