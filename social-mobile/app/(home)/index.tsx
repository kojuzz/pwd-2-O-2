import { Text, View } from "react-native";

import { Link } from "expo-router";

export default function Home() {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontWeight: "bold", fontSize: 24 }}>Home Page</Text>
			<Link
				href="/form"
				style={{ color: "blue", marginTop: 20 }}>
				Open Form
			</Link>
		</View>
	);
}
