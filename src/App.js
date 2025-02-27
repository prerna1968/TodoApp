import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Todo from "./components/home";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
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
      path: "/home",
      element: <Todo />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
     
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
  
    </AuthProvider>
  );
}

export default App;
