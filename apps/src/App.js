import { Routes, Route } from "react-router-dom";
import "./App.css";
import NewDashboard from "./pages/dashboard/NewDashboard";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard/*" element={<NewDashboard />} />
    </Routes>
  );
}

export default App;
