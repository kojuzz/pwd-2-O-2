import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
    ArrowBack as BackIcon,
} from "@mui/icons-material";

import { useApp } from "../AppProvider";

import { useLocation, useNavigate } from "react-router";

export default function Header() {
	const { mode, setMode, setOpenDrawer } = useApp();
    const { pathname } = useLocation();
    const navigate = useNavigate();

	return (
		<AppBar position="static">
			<Toolbar>
				{pathname === "/" ? (
					<IconButton onClick={() => setOpenDrawer(true)}>
						<MenuIcon />
					</IconButton>
				) : (
					<IconButton onClick={() => navigate("/")}>
						<BackIcon />
					</IconButton>
				)}

				<Typography sx={{ flexGrow: 1, ml: 2 }}>Social App</Typography>
				{mode === "dark" ? (
					<IconButton
						onClick={() => setMode("light")}
						color="inherit">
						<LightModeIcon />
					</IconButton>
				) : (
					<IconButton
						onClick={() => setMode("dark")}
						color="inherit">
						<DarkModeIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
