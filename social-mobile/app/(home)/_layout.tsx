import { Tabs, Link } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

export default function HomeLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#0F766E",
				tabBarInactiveTintColor: "#6B7280",
				tabBarStyle: {
					backgroundColor: "#FFFFFF",
					borderTopColor: "#E5E7EB",
					borderTopWidth: 1,
					height: 64,
					paddingTop: 6,
					paddingBottom: 10,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
				},
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerRight: () => (
						<Link
							href="/form"
							asChild>
							<TouchableOpacity
								style={{
									marginRight: 12,
									width: 36,
									height: 36,
									borderRadius: 18,
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Ionicons
									name="add"
									size={22}
								/>
							</TouchableOpacity>
						</Link>
					),
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="home"
								size={24}
								color={color}
							/>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="person"
								size={24}
								color={color}
							/>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								name="settings"
								size={24}
								color={color}
							/>
						);
					},
				}}
			/>
		</Tabs>
	);
}
