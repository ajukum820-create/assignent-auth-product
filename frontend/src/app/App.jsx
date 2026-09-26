import { RouterProvider } from "react-router";
import "./App.css";
import router from "./app.router";
import AuthProvider from "../modules/auth/context/authProvider";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
