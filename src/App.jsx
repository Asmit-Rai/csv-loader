import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import "./App.css";
import CsvView from "./pages/CsvView";

const ProtectedRoute = ({ children }) => {
  const getAuthStatus = () => {
    try {
      const storedAuth = sessionStorage.getItem("user");
      if (!storedAuth) return false;
      return JSON.parse(storedAuth) === true;
    } catch {
      return false;
    }
  };

  return getAuthStatus() ? children : <Navigate to="/sign-in" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/csv"
        element={
          <ProtectedRoute>
            <CsvView />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
