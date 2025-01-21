import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Key from "./pages/Key";
import Pic from "./pages/Pic";
import "./styles.css";

export default function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/key" element={<Key />} />
                    <Route path="/pic" element={<Pic />} />
                </Routes>
            </div>
        </Router>
    );
}
