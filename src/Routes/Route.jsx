import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Accounts from "../pages/Accounts/Accounts";
import Deposit from "../pages/Deposit/Deposit";
import Home from "../pages/Home/Home";
import Transactions from "../pages/Transactions/Transactions";
import Transfer from "../pages/Transfer/Transfer";
import Withdraw from "../pages/Withdraw/Withdraw";

 export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { 
        path: "/", 
        element: <Home /> 
      },
      { 
        path: "/accounts", 
        element: <Accounts /> 
      },
      { 
        path: "/deposit", 
        element: <Deposit /> 
      },
      { 
        path: "/withdraw", 
        element: <Withdraw /> 
      },
      { 
        path: "/transfer", 
        element: <Transfer /> 
      },
      { 
        path: "/transactions", 
        element: <Transactions /> 
      },
    ],
  },
]);

