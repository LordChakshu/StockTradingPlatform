import "./App.css";
import "./global.css";
import Register from "./Auth/register/Register";
import Login from "./Auth/login/login";
import Home from "./Home/home";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Error from "./Error/error";
import StockList from "./Stock-List/stocks";
import NavBar from "./NavBar/navBar";
import { StockProvider } from "./Stock-List/stockContext";

function App() {
  return (
    <div className="App">
      <NavBar />
      <StockProvider>
        <Outlet />
      </StockProvider>
    </div>
  );
}

export const stockTradingRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/stocks",
        element: <StockList />,
      },
    ],
  },
]);

export default App;
