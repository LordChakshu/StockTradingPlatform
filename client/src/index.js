import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { stockTradingRouter } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-45ybmbnpc683rnhn.us.auth0.com"
      clientId="8m1UDkvrB4hJU8JyPhdYMOoDIUQkohF4"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={stockTradingRouter} />
    </Auth0Provider>
  </React.StrictMode>
);
