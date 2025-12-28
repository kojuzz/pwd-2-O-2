import { PostType } from "@/types/global";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import { api } from "@/libs/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useQueryClient } from "@tanstack/react-query";
import { useApp } from "./app-provider";

export default function Post({ post }: { post: PostType }) {
	const queryClient = useQueryClient();
	const { auth } = useApp();

	const like = async () => {
		const token = await AsyncStorage.getItem("token");
		await fetch(`${api}/posts/${post.id}/like`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		await queryClient.invalidateQueries({
			queryKey: ["posts"],
		});

		await queryClient.invalidateQueries({
			queryKey: ["post"],
		});
	};

	const unlike = async () => {
		const token = await AsyncStorage.getItem("token");
		await fetch(`${api}/posts/${post.id}/like`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		await queryClient.invalidateQueries({
			queryKey: ["posts"],
		});

		await queryClient.invalidateQueries({
			queryKey: ["post"],
		});
	};

	const isLiked = auth
		? post.likes.some(like => like.userId === auth.id)
		: false;

	return (
		<View
			style={{
				borderBottomWidth: 1,
				borderColor: "#E5E7EB",
				paddingVertical: 18,
				paddingHorizontal: 16,
				backgroundColor: "#FFFFFF",
			}}>
			<View style={{ flexDirection: "row", gap: 12 }}>
				<View>
					<View
						style={{
							width: 50,
							height: 50,
							borderRadius: 50,
							backgroundColor: "#0F766E",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Text
							style={{
								fontSize: 17,
								fontWeight: "700",
								color: "#FFFFFF",
							}}>
							{post.user.name[0]}
						</Text>
					</View>
				</View>
				<View style={{ flexShrink: 1 }}>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "600",
							color: "#111827",
						}}>
						{post.user.name}
					</Text>
					<Text
						style={{
							color: "#6B7280",
							fontSize: 13,
							marginTop: 2,
						}}>
						{post.createdAt}
					</Text>
					<TouchableOpacity
						onPress={() => {
							router.push(`/view/${post.id}`);
						}}>
						<Text
							style={{
								marginTop: 6,
								fontSize: 16,
								lineHeight: 22,
								color: "#1F2937",
							}}>
							{post.content}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					marginTop: 14,
					flexDirection: "row",
					justifyContent: "space-around",
				}}>
				<View
					style={{
						flexDirection: "row",
						gap: 8,
						alignItems: "center",
					}}>
					{isLiked ? (
						<TouchableOpacity onPress={unlike}>
							<Ionicons name="heart" color="#EF4444" size={24} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={like}>
							<Ionicons
								name="heart-outline"
								color="#EF4444"
								size={24}
							/>
						</TouchableOpacity>
					)}
					<Text style={{ color: "#374151", fontSize: 13 }}>
						{post.likes.length}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 8,
						alignItems: "center",
					}}>
					<TouchableOpacity>
						<Ionicons
							name="chatbubble-outline"
							color="#6B7280"
							size={24}
						/>
					</TouchableOpacity>
					<Text style={{ color: "#374151", fontSize: 13 }}>
						{post.comments.length}
					</Text>
				</View>
			</View>
		</View>
	);
}
