import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RepairRegistration from "./pages/RepairRegistration";
import RegisterRequest from "./pages/RegisterRequest";
import BuyRequest from "./pages/BuyRequest";
import Receipt from "./pages/Receipt";
import TrackRequest from "./pages/TrackRequest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Legacy route — kept for backward compatibility */}
        <Route path="/register-repair" element={<RepairRegistration />} />
        {/* New request system */}
        <Route path="/register-request" element={<RegisterRequest />} />
        <Route path="/buy-request" element={<BuyRequest />} />
        <Route path="/receipt" element={<Receipt />} />
        {/* Phase 2: Enable when tracking is live */}
        <Route path="/track" element={<TrackRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
