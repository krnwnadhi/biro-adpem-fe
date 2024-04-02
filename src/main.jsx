import "@mantine/core/styles.css";

import {
    Loader,
    MantineProvider,
    createTheme,
    localStorageColorSchemeManager,
} from "@mantine/core";

import App from "./App.jsx";
import ReactDOM from "react-dom/client";

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
        <App />
    </MantineProvider>
);
