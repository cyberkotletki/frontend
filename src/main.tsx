import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <HeroUIProvider>
          <ToastProvider />
          <main className="dark text-foreground bg-background">
            <App />
          </main>
        </HeroUIProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
