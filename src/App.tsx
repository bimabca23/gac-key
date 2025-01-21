import { ThemeProvider, createTheme } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Key from "./pages/Key";
import Pic from "./pages/Pic";
import "./styles.css";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0bc9f4",
        },
        secondary: {
            main: "#566477",
        },
        success: {
            main: "#10bc8e",
        },
        warning: {
            main: "#fd9935",
        },
        error: {
            main: "#e33b35",
        },
        info: {
            main: "#05dae1",
        },
        text: {
            primary: "#fff",
            disabled: "#ccc",
        },
        background: {
            default: "#15141f",
            paper: "#21202d",
        },
    },
    typography: {
        allVariants: {
            color: "#fff",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    background: "#232230",
                    borderRadius: 4,
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: "#0bbee4",
                },
            },
        },
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    );
}
