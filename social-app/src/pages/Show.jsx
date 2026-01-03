import { Box, IconButton, OutlinedInput, Typography } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";

import { Send as AddCommentIcon } from "@mui/icons-material";

import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { api } from "../libs/config";
import { useApp } from "../AppProvider";

export default function Show() {
	const { id } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { auth } = useApp();

	const [comment, setComment] = useState("");
	const [commentError, setCommentError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: post, error, isLoading } = useQuery({
		queryKey: ["posts", id],
		queryFn: async () => {
			const res = await fetch(`${api}/posts/${id}`);
			if (!res.ok) {
				throw new Error("Failed to load post");
			}
			return res.json();
		},
	});

	const handleDeleted = () => {
		navigate("/");
		queryClient.invalidateQueries({ queryKey: ["posts"] });
	};

	const addComment = async e => {
		e.preventDefault();

		if (!auth) {
			window.alert("Login required to comment.");
			return;
		}

		if (!comment.trim()) {
			setCommentError("Comment cannot be empty.");
			return;
		}

		const token = localStorage.getItem("token");
		if (!token) {
			window.alert("Session expired. Please login again.");
			return;
		}

		setCommentError("");
		setIsSubmitting(true);

		const res = await fetch(`${api}/posts/${id}/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ content: comment }),
		});

		setIsSubmitting(false);

		if (!res.ok) {
			setCommentError("Unable to add comment. Please try again.");
			return;
		}

		setComment("");
		queryClient.invalidateQueries({ queryKey: ["posts", id] });
		queryClient.invalidateQueries({ queryKey: ["posts"] });
	};

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	if (error) {
		return <Typography>{error.message}</Typography>;
	}

	return (
		<Box>
			<Post post={post} onDeleted={handleDeleted} />

			<Box sx={{ mb: 2 }}>
				<form onSubmit={addComment}>
					<OutlinedInput
						fullWidth
						placeholder={
							auth ? "Your comment..." : "Login to add a comment"
						}
						disabled={!auth}
						value={comment}
						onChange={e => setComment(e.target.value)}
						endAdornment={
							<IconButton
								type="submit"
								disabled={!auth || isSubmitting}>
								<AddCommentIcon />
							</IconButton>
						}
					/>
					{commentError && (
						<Typography color="error" sx={{ mt: 1 }}>
							{commentError}
						</Typography>
					)}
				</form>
			</Box>

			{post.comments.map(commentItem => {
				return (
					<Comment
						key={commentItem.id}
						comment={commentItem}
						postId={post.id}
					/>
				);
			})}
		</Box>
	);
}
