import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import RepairRegistration from "./pages/RepairRegistration";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register-repair" element={<RepairRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
