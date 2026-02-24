import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App";

// IMPORTANT: load exported styles (pick what exists/you want)
import "./styles/index.css";
// If your project expects these too, you can add them:
// import "./styles/tailwind.css";
// import "./styles/theme.css";
// import "./styles/fonts.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);