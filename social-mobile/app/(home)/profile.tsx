import { Text, View } from "react-native";

export default function Profile() {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontWeight: "bold", fontSize: 24 }}>
				Profile Page
			</Text>
		</View>
	);
}
