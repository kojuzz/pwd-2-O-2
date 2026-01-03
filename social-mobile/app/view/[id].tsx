import {
	Alert,
	ScrollView,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import Post from "@/components/post";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PostType } from "@/types/global";
import Comment from "@/components/comment";

import { api } from "@/libs/config";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApp } from "@/components/app-provider";

export default function Home() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const queryClient = useQueryClient();
	const { auth } = useApp();

	const [reply, setReply] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const postIdParam = Array.isArray(id) ? id[0] : id;

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		enabled: Boolean(postIdParam),
		queryKey: ["post", postIdParam],
		queryFn: async (): Promise<PostType> => {
			const res = await fetch(`${api}/posts/${postIdParam}`);
			if (!res.ok) {
				throw new Error("Failed to load post");
			}
			return res.json();
		},
	});

	const handleAddComment = async () => {
		if (!auth) {
			Alert.alert("Login required", "You need to login to comment.");
			return;
		}

		if (!reply.trim()) {
			Alert.alert("Add a comment", "Comment cannot be empty.");
			return;
		}

		if (!postIdParam) {
			Alert.alert("Invalid post", "Unable to find this post.");
			return;
		}

		try {
			setIsSubmitting(true);
			const token = await AsyncStorage.getItem("token");
			const res = await fetch(`${api}/posts/${postIdParam}/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ content: reply }),
			});

			if (!res.ok) {
				throw new Error("Unable to add comment");
			}

			setReply("");
			await queryClient.invalidateQueries({
				queryKey: ["post", postIdParam],
			});
			await queryClient.invalidateQueries({
				queryKey: ["posts"],
			});
		} catch (err) {
			Alert.alert(
				"Something went wrong",
				err instanceof Error ? err.message : "Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};

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
			<Post post={post} onDeleted={() => router.back()} />

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
					onPress={handleAddComment}
					disabled={isSubmitting}
					style={{
						backgroundColor: isSubmitting ? "#6B7280" : "#0F766E",
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
						{isSubmitting ? "Posting..." : "Add Comment"}
					</Text>
				</TouchableOpacity>
			</View>

			{post.comments.map(comment => {
				return (
					<Comment
						key={comment.id}
						comment={comment}
						postId={post.id}
					/>
				);
			})}
		</ScrollView>
	);
}
