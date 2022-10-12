import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//import App from "./App";
//import App from "./server/App";
import App from "./App2";
import { ScansApp, TransApp } from "./App3";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
/*
const scansElement = document.getElementById("pxq_pgck_scans");
const transElement = document.getElementById("pxq_pgck_trans");
//const scansRoot = createRoot(scansElement);
const transRoot = createRoot(transElement);

//scansRoot.render(<ScansApp />);
transRoot.render(<TransApp />);
*/
