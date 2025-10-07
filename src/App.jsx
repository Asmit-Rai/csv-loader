import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import "./App.css";
import CsvView from "./pages/CsvView";

function App() {
  const isLoggedIn = JSON.parse(sessionStorage.getItem("user"));
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn/>}/>

      <Route
        path="/"
        element={isLoggedIn == true ? <Home /> : <Navigate to="/sign-in" replace />}
      />
      <Route
        path="/csv"
        element={isLoggedIn == true ? <CsvView /> : <Navigate to="/sign-in" replace />}
      />
    </Routes>
  );
}

export default App;
