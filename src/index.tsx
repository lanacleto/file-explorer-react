import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.scss";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

root.render(<React.StrictMode>
  <App />
</React.StrictMode>);
