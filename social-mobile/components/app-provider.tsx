import { UserType } from "@/types/global";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppContext = createContext<{
	auth: UserType | undefined;
	setAuth: Dispatch<SetStateAction<undefined>>;
}>({ auth: undefined, setAuth: () => {} });

export function useApp() {
	if (AppContext) {
		return useContext(AppContext);
	}

	throw new Error("App Context do not exitst");
}

export default function AppProvider({ children }: { children: ReactNode }) {
	const [auth, setAuth] = useState();

	useEffect(() => {
		//
	}, []);

	return (
		<AppContext.Provider value={{ auth, setAuth }}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</AppContext.Provider>
	);
}
