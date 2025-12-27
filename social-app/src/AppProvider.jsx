import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const AppContext = createContext();

export function useApp() {
	return useContext(AppContext);
}

export default function AppProvider({ children }) {
	const [mode, setMode] = useState("dark");
	const [openDrawer, setOpenDrawer] = useState(false);
	const [auth, setAuth] = useState();

    useEffect(() => {
        const api = "http://localhost:8800";
        const token = localStorage.getItem("token");
        if(token) {
            fetch(`${api}/users/verify`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(async res => {
                if(res.ok) {
                    const user = await res.json();
					setAuth(user);
                } else {
                    localStorage.removeItem("token");
                }
            });
        }
    }, []);

	const theme = useMemo(() => {
		return createTheme({
			palette: { mode },
		});
	}, [mode]);

	return (
		<AppContext.Provider
			value={{ mode, setMode, openDrawer, setOpenDrawer, auth, setAuth }}>
			<ThemeProvider theme={theme}>
				{children}
				<CssBaseline />
			</ThemeProvider>
		</AppContext.Provider>
	);
}
