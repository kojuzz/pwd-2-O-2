import { Avatar, Typography, Box, IconButton } from "@mui/material";

import { grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { useApp } from "../AppProvider";
import { api } from "../libs/config";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

export default function Comment({ comment, postId }) {
	const { auth } = useApp();
	const queryClient = useQueryClient();

	const isOwner = auth?.id === comment.user.id;

	const handleDelete = async () => {
		if (!window.confirm("Delete this comment?")) {
			return;
		}

		const token = localStorage.getItem("token");
		if (!token) {
			window.alert("Session expired. Please login again.");
			return;
		}

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
			window.alert("Unable to delete comment. Please try again.");
			return;
		}

		queryClient.invalidateQueries({ queryKey: ["posts", String(postId)] });
		queryClient.invalidateQueries({ queryKey: ["posts"] });
	};

	return (
		<Box sx={{ p: 2, border: "1px solid #66666680", mb: 1 }}>
			<Box
				sx={{
					display: "flex",
					gap: 2,
					alignItems: "flex-start",
					justifyContent: "space-between",
				}}>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Avatar
						sx={{ width: 52, height: 52, background: grey[500] }}
					/>
					<Box>
						<Typography>{comment.user.name}</Typography>
						<Typography color="success">
							{comment.createdAt}
						</Typography>
						<Typography sx={{ mt: 1 }}>
							{comment.content}
						</Typography>
					</Box>
				</Box>
				{isOwner && (
					<IconButton
						color="error"
						size="small"
						onClick={handleDelete}>
						<DeleteIcon fontSize="small" />
					</IconButton>
				)}
			</Box>
		</Box>
	);
}

Comment.propTypes = {
	comment: PropTypes.shape({
		id: PropTypes.number.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.string,
		user: PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	postId: PropTypes.number.isRequired,
};
