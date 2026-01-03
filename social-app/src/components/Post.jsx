import {
	Avatar,
	Card,
	CardContent,
	Typography,
	Box,
	ButtonGroup,
	IconButton,
	Button,
	Stack,
} from "@mui/material";

import { green } from "@mui/material/colors";

import {
	FavoriteBorderOutlined as LikeIcon,
	Favorite as LikedIcon,
	ChatBubbleOutlineOutlined as CommentIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router";
import { useApp } from "../AppProvider";
import { api } from "../libs/config";
import { useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

export default function Post({ post, onDeleted }) {
	const navigate = useNavigate();
	const { auth } = useApp();
	const queryClient = useQueryClient();

	const isLiked = auth
		? post.likes?.some(like => like.userId === auth.id)
		: false;
	const likeCount = post.likes ? post.likes.length : 0;
	const commentCount = post.comments ? post.comments.length : 0;
	const isOwner = auth?.id === post.userId;

	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ["posts"] });
		queryClient.invalidateQueries({
			queryKey: ["posts", String(post.id)],
		});
	};

	const like = async method => {
		if (!auth) {
			window.alert("Login required to like posts.");
			return;
		}

		const token = localStorage.getItem("token");
		if (!token) {
			window.alert("Session expired. Please login again.");
			return;
		}

		const res = await fetch(`${api}/posts/${post.id}/like`, {
			method,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			window.alert("Unable to update like. Please try again.");
			return;
		}

		invalidate();
	};

	const handleDelete = async () => {
		if (!window.confirm("Delete this post?")) {
			return;
		}

		const token = localStorage.getItem("token");
		if (!token) {
			window.alert("Session expired. Please login again.");
			return;
		}

		const res = await fetch(`${api}/posts/${post.id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			window.alert("Unable to delete post. Please try again.");
			return;
		}

		invalidate();
		onDeleted?.();
	};

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Stack
					direction="row"
					alignItems="flex-start"
					justifyContent="space-between"
					gap={2}>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Avatar
							sx={{ width: 64, height: 64, background: green[500] }}
						/>
						<Box>
							<Typography>{post.user.name}</Typography>
							<Typography color="success">
								{post.createdAt}
							</Typography>
							<Typography
								sx={{ mt: 1, cursor: "pointer" }}
								onClick={() => navigate(`/show/${post.id}`)}>
								{post.content}
							</Typography>
						</Box>
					</Box>
					{isOwner && (
						<IconButton
							color="error"
							size="small"
							onClick={handleDelete}>
							<DeleteIcon />
						</IconButton>
					)}
				</Stack>
				<Box
					sx={{
						display: "flex",
						mt: 2,
						justifyContent: "space-around",
					}}>
					<ButtonGroup>
						<IconButton
							onClick={() => like(isLiked ? "DELETE" : "POST")}
							color="error">
							{isLiked ? <LikedIcon /> : <LikeIcon />}
						</IconButton>
						<Button size="small" variant="text">
							{likeCount}
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton onClick={() => navigate(`/show/${post.id}`)}>
							<CommentIcon />
						</IconButton>
						<Button size="small" variant="text">
							{commentCount}
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}

Post.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.number.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.string,
		userId: PropTypes.number.isRequired,
		user: PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		}).isRequired,
		likes: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				userId: PropTypes.number.isRequired,
			})
		),
		comments: PropTypes.array,
	}).isRequired,
	onDeleted: PropTypes.func,
};

Post.defaultProps = {
	onDeleted: undefined,
};
