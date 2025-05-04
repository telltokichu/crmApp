import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";

import "./assets/styles/app.css";

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ThemeProvider>
            </Provider>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
