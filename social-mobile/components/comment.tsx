import { CommentType } from "@/types/global";
import {
	View,
	Text,
	TouchableOpacity,
	Alert,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";

import { api } from "@/libs/config";
import { useApp } from "./app-provider";

type CommentProps = {
	comment: CommentType;
	postId: number;
};

export default function Comment({ comment, postId }: CommentProps) {
	const { auth } = useApp();
	const queryClient = useQueryClient();

	const isOwner = auth?.id === comment.user.id;

	const handleDelete = async () => {
		const token = await AsyncStorage.getItem("token");
		const res = await fetch(
			`${api}/posts/${postId}/comments/${comment.id}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!res.ok) {
			Alert.alert("Unable to delete comment", "Please try again.");
			return;
		}

		await queryClient.invalidateQueries({
			queryKey: ["post", String(postId)],
		});
		await queryClient.invalidateQueries({
			queryKey: ["posts"],
		});
	};

	const openMenu = () =>
		Alert.alert("Comment options", undefined, [
			{ text: "Cancel", style: "cancel" },
			{ text: "Delete comment", style: "destructive", onPress: handleDelete },
		]);

	return (
		<View
			style={{
				borderBottomWidth: 1,
				borderColor: "#E5E7EB",
				paddingVertical: 18,
				paddingHorizontal: 16,
			}}>
			<View
				style={{
					flexDirection: "row",
					gap: 12,
					justifyContent: "space-between",
				}}>
				<View style={{ flexDirection: "row", gap: 12, flex: 1 }}>
					<View>
						<View
							style={{
								width: 50,
								height: 50,
								borderRadius: 50,
								backgroundColor: "#64748B",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Text
								style={{
									fontSize: 17,
									fontWeight: "700",
									color: "#FFFFFF",
								}}>
								{comment.user.name[0]}
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
							{comment.user.name}
						</Text>
						<Text
							style={{
								marginTop: 6,
								fontSize: 16,
								lineHeight: 22,
								color: "#1F2937",
							}}>
							{comment.content}
						</Text>
					</View>
				</View>
				{isOwner && (
					<TouchableOpacity
						onPress={openMenu}
						style={{
							width: 32,
							height: 32,
							borderRadius: 16,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Ionicons
							name="ellipsis-vertical"
							color="#6B7280"
							size={18}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}
