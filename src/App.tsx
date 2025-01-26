import { ThemeProvider, createTheme } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Key from "./pages/Key";
import Pic from "./pages/Pic";
import "./styles.css";
import Login from "./pages/Login";
import { UseCaseFactory, UseCaseFactoryImpl } from "./usecase/UseCaseFactory";
import { useEffect, useState } from "react";

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
            secondary: "#000",
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
        MuiFormControl: {
            styleOverrides: {
                root: {
                    background: "#232230",
                    borderRadius: 4,
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#fff",
                        },
                        "& svg": {
                            color: "#fff",
                        },
                    },
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
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [ready, setReady] = useState<boolean>(false);
    const pathList: string[] = ["/", "/history", "/key", "pic"];

    useEffect(() => {
        const login: boolean = useCaseFactory.user().isLogin();
        const path: string = window.location.pathname;

        setIsLogin(login);

        if (
            (login && path === "/login") ||
            (!login && pathList.includes(path))
        ) {
            window.location.assign(login ? "/" : "/login");
        } else {
            setReady(true);
        }
    }, [pathList]);

    return (
        <ThemeProvider theme={theme}>
            {ready ? (
                <Router>
                    <div className="App">
                        {isLogin ? <Navbar /> : <></>}
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/history" element={<History />} />
                            <Route path="/key" element={<Key />} />
                            <Route path="/pic" element={<Pic />} />
                        </Routes>
                    </div>
                </Router>
            ) : (
                <></>
            )}
        </ThemeProvider>
    );
}
