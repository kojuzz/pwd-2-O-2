import { useApp } from "@/components/app-provider";
import { Text, TouchableOpacity, View, TextInput } from "react-native";

import { useState } from "react";
import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "@/libs/config";

export default function Profile() {
	const { auth, setAuth } = useApp();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = async () => {
		const res = await fetch(`${api}/users/login`, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			const { user, token } = await res.json();
			setAuth(user);
			await AsyncStorage.setItem("token", token);
			router.push("/");
		} else {
			alert("Unable to login");
		}
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#F9FAFB",
				paddingHorizontal: 24,
			}}>
			<Text
				style={{
					fontWeight: "700",
					fontSize: 24,
					letterSpacing: 0.2,
					color: "#111827",
				}}>
				Profile Page
			</Text>

			{auth ? (
				<View
					style={{
						marginTop: 20,
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "600",
							color: "#111827",
						}}>
						{auth.name}
					</Text>
					<TouchableOpacity
						style={{
							marginTop: 20,
							paddingVertical: 12,
							paddingHorizontal: 32,
							backgroundColor: "#EF4444",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 12,
						}}
						onPress={() => setAuth(undefined)}>
						<Text
							style={{
								color: "#FFFFFF",
								fontWeight: "700",
								fontSize: 16,
							}}>
							Logout
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={{ marginTop: 20, width: "100%" }}>
					<TextInput
						autoCapitalize="none"
						placeholder="username"
						placeholderTextColor="#9CA3AF"
						value={username}
						onChangeText={setUsername}
						style={{
							paddingVertical: 12,
							paddingHorizontal: 14,
							borderWidth: 1,
							borderRadius: 10,
							borderColor: "#E5E7EB",
							fontSize: 16,
							backgroundColor: "#FFFFFF",
							marginBottom: 10,
							width: "100%",
							color: "#111827",
						}}
					/>
					<TextInput
						secureTextEntry
						value={password}
						onChangeText={setPassword}
						placeholder="password"
						placeholderTextColor="#9CA3AF"
						style={{
							paddingVertical: 12,
							paddingHorizontal: 14,
							borderWidth: 1,
							borderRadius: 10,
							borderColor: "#E5E7EB",
							fontSize: 16,
							backgroundColor: "#FFFFFF",
							marginBottom: 12,
							width: "100%",
							color: "#111827",
						}}
					/>

					<TouchableOpacity
						style={{
							backgroundColor: "#0F766E",
							paddingVertical: 12,
							borderRadius: 12,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={login}>
						<Text
							style={{
								color: "#FFFFFF",
								fontWeight: "700",
								fontSize: 16,
							}}>
							Login
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}
