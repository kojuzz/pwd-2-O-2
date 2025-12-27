import { Stack } from "expo-router";

import AppProvider from "@/components/app-provider";

export default function RootLayout() {
	return (
		<AppProvider>
			<Stack>
				<Stack.Screen
					name="(home)"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="form"
					options={{
						presentation: "modal",
						title: "New Post",
					}}
				/>
			</Stack>
		</AppProvider>
	);
}
