import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dash";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
    </div>
  );
}
