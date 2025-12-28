import {
	ScrollView,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import Post from "@/components/post";

import { useQuery } from "@tanstack/react-query";
import { PostType } from "@/types/global";
import Comment from "@/components/comment";

import { api } from "@/libs/config";
import { useState } from "react";

export default function Home() {
	const { id } = useLocalSearchParams();

	const [reply, setReply] = useState("");

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: async (): Promise<PostType> => {
			const res = await fetch(`${api}/posts/${id}`);
			return res.json();
		},
	});

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#F9FAFB",
				}}>
				<Text style={{ color: "#6B7280" }}>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#F9FAFB",
				}}>
				<Text style={{ color: "#DC2626" }}>{error.message}</Text>
			</View>
		);
	}

	if (!post) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#F9FAFB",
				}}>
				<Text style={{ color: "#6B7280" }}>Post not found</Text>
			</View>
		);
	}

	return (
		<ScrollView style={{ backgroundColor: "#F9FAFB" }}>
			<Post key={post.id} post={post} />

			<View
				style={{
					marginHorizontal: 16,
					marginTop: 12,
					marginBottom: 8,
					padding: 12,
					backgroundColor: "#FFFFFF",
					borderRadius: 12,
					borderWidth: 1,
					borderColor: "#E5E7EB",
				}}>
				<Text
					style={{
						fontSize: 14,
						fontWeight: "600",
						color: "#374151",
						marginBottom: 8,
					}}>
					Add a reply
				</Text>
				<TextInput
					placeholder="Your reply"
					placeholderTextColor="#9CA3AF"
					value={reply}
					onChangeText={setReply}
					style={{
						paddingVertical: 10,
						paddingHorizontal: 12,
						borderWidth: 1,
						borderRadius: 10,
						borderColor: "#E5E7EB",
						fontSize: 16,
						backgroundColor: "#FFFFFF",
						marginBottom: 10,
						color: "#111827",
					}}
				/>
				<TouchableOpacity
					style={{
						backgroundColor: "#0F766E",
						paddingVertical: 12,
						borderRadius: 10,
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Text
						style={{
							color: "#FFFFFF",
							fontWeight: "700",
							fontSize: 16,
						}}>
						Add Comment
					</Text>
				</TouchableOpacity>
			</View>

			{post.comments.map(comment => {
				return <Comment key={comment.id} comment={comment} />;
			})}
		</ScrollView>
	);
}
