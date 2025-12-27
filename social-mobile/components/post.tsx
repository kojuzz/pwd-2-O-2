import { PostType } from "@/types/global";
import { View, Text } from "react-native";

export default function Post({ post }: { post: PostType }) {
	return (
		<View
			style={{
				flexDirection: "row",
				gap: 10,
				borderBottomWidth: 1,
				borderColor: "#66666630",
				paddingVertical: 20,
				paddingHorizontal: 15,
				backgroundClip: "white",
			}}>
			<View>
				<View
					style={{
						width: 52,
						height: 52,
						borderRadius: 52,
						backgroundColor: "green",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Text
						style={{
							fontSize: 18,
							color: "white",
						}}>
						{post.user.name[0]}
					</Text>
				</View>
			</View>
			<View style={{ flexShrink: 1 }}>
				<Text style={{ fontSize: 18 }}>{post.user.name}</Text>
				<Text style={{ color: "green" }}>{post.createdAt}</Text>
				<Text style={{ marginTop: 5, fontSize: 16 }}>
					{post.content}
				</Text>
			</View>
		</View>
	);
}
