import KeyIcon from "@mui/icons-material/Key";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { UseCaseFactory, UseCaseFactoryImpl } from "../usecase/UseCaseFactory";
import { User } from "../types/user/User";
import { Button } from "@mui/material";

export default function Navbar() {
    const useCaseFactory: UseCaseFactory = new UseCaseFactoryImpl();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const user: User = JSON.parse(useCaseFactory.session().get("user"));

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = (): void => {
        useCaseFactory.user().logout();
        window.location.reload();
    };

    return (
        <AppBar position="static">
            <Box>
                <Toolbar
                    sx={{ backgroundColor: "background.default" }}
                    disableGutters
                >
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        <IconButton
                            size="large"
                            onClick={() => setSidebarOpen(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <KeyIcon sx={{ display: "flex", mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: "flex",
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "primary.main",
                            textDecoration: "none",
                        }}
                    >
                        GAC KEY
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ mr: 1 }}>
                            <Avatar
                                sx={{
                                    backgroundColor: "background.default",
                                    color: "primary.main",
                                    border: 2,
                                    borderColor: "primary.main",
                                    fontWeight: "bold",
                                    fontSize: 17,
                                }}
                            >
                                {user.initial}
                            </Avatar>
                        </IconButton>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Typography sx={{ px: 2, pt: 1 }} fontWeight="bold">
                                {user.name}
                            </Typography>
                            <Typography sx={{ px: 2, pb: 3 }}>
                                {user.role}
                            </Typography>
                            <Box sx={{ px: 2, pb: 1 }}>
                                <Button
                                    fullWidth
                                    onClick={logout}
                                    color="error"
                                    variant="outlined"
                                >
                                    Logout
                                </Button>
                            </Box>
                        </Menu>
                    </Box>
                </Toolbar>
                <Sidebar
                    open={sidebarOpen}
                    setOpen={(open: boolean) => setSidebarOpen(open)}
                />
            </Box>
        </AppBar>
    );
}
