import "./main.module.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";
import "mantine-react-table/styles.css";
import "@mantine/dates/styles.css";

import {
    Loader,
    MantineProvider,
    createTheme,
    localStorageColorSchemeManager,
} from "@mantine/core";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { pdfjs } from "react-pdf";
import store from "./redux/store/store.js";

// Konfigurasi path ke worker pdf.js dari CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
            <ModalsProvider>
                <BrowserRouter>
                    <ParallaxProvider>
                        <Notifications
                            position="bottom-right"
                            limit={3}
                            zIndex={99999}
                        />
                        <NavigationProgress />
                        <App />
                    </ParallaxProvider>
                </BrowserRouter>
            </ModalsProvider>
        </Provider>
    </MantineProvider>
);
