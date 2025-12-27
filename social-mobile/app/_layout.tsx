import { Stack } from "expo-router";

export default function RootLayout() {
	return (
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
                    title: "New Post"
				}}
			/>
		</Stack>
	);
}
