import { CommentType } from "@/types/global";
import { View, Text } from "react-native";

export default function Comment({ comment }: { comment: CommentType }) {
	return (
		<View
			style={{
				borderBottomWidth: 1,
				borderColor: "#E5E7EB",
				paddingVertical: 18,
				paddingHorizontal: 16,
			}}>
			<View style={{ flexDirection: "row", gap: 12 }}>
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
		</View>
	);
}
