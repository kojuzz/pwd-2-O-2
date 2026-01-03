import {
	Alert,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";

import { api } from "@/libs/config";
import { useApp } from "@/components/app-provider";

export default function Form() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { auth } = useApp();

	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async () => {
		if (!auth) {
			Alert.alert(
				"Login required",
				"You have to login before creating a post."
			);
			return;
		}

		if (!content.trim()) {
			Alert.alert("Add some text", "Post content cannot be empty.");
			return;
		}

		try {
			setIsSubmitting(true);
			const token = await AsyncStorage.getItem("token");
			const res = await fetch(`${api}/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ content }),
			});

			if (!res.ok) {
				throw new Error("Unable to create post");
			}

			await queryClient.invalidateQueries({ queryKey: ["posts"] });
			setContent("");
			router.back();
		} catch (error) {
			Alert.alert(
				"Something went wrong",
				error instanceof Error ? error.message : "Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!auth) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					paddingHorizontal: 24,
					backgroundColor: "#F9FAFB",
				}}>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "600",
						color: "#111827",
						textAlign: "center",
						marginBottom: 16,
					}}>
					You need to login to create a post.
				</Text>
				<TouchableOpacity
					onPress={() => router.push("/(home)/profile")}
					style={{
						paddingVertical: 12,
						paddingHorizontal: 28,
						backgroundColor: "#0F766E",
						borderRadius: 12,
					}}>
					<Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
						Go to Profile
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				padding: 24,
				backgroundColor: "#F9FAFB",
			}}>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "700",
					color: "#111827",
					marginBottom: 12,
				}}>
				Create a Post
			</Text>
			<TextInput
				multiline
				numberOfLines={6}
				value={content}
				onChangeText={setContent}
				placeholder="What's on your mind?"
				placeholderTextColor="#9CA3AF"
				style={{
					borderWidth: 1,
					borderColor: "#E5E7EB",
					borderRadius: 16,
					padding: 16,
					fontSize: 16,
					backgroundColor: "#FFFFFF",
					color: "#111827",
					textAlignVertical: "top",
				}}
			/>
			<TouchableOpacity
				disabled={isSubmitting}
				onPress={handleSubmit}
				style={{
					marginTop: 16,
					backgroundColor: isSubmitting ? "#6B7280" : "#0F766E",
					paddingVertical: 14,
					borderRadius: 16,
					alignItems: "center",
				}}>
				<Text
					style={{
						color: "#FFFFFF",
						fontWeight: "700",
						fontSize: 16,
					}}>
					{isSubmitting ? "Posting..." : "Post"}
				</Text>
			</TouchableOpacity>
		</View>
	);
}
