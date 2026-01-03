import {
	Card,
	CardContent,
	Typography,
	OutlinedInput,
	Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useApp } from "../AppProvider";
import { api } from "../libs/config";

export default function Form() {
	const { auth } = useApp();
	const queryClient = useQueryClient();

	const [error, setError] = useState("");
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm({ defaultValues: { content: "" } });

	if (!auth) {
		return null;
	}

	const submit = async ({ content }) => {
		if (!content.trim()) {
			setError("Post content cannot be empty.");
			return;
		}

		const token = localStorage.getItem("token");
		if (!token) {
			setError("You must login again.");
			return;
		}

		setError("");

		const res = await fetch(`${api}/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ content }),
		});

		if (!res.ok) {
			setError("Unable to create post. Please try again.");
			return;
		}

		reset();
		queryClient.invalidateQueries({ queryKey: ["posts"] });
	};

	return (
		<Card sx={{ mb: 3 }}>
			<CardContent>
				<Typography variant="h6" sx={{ mb: 1 }}>
					Create a post
				</Typography>
				<form onSubmit={handleSubmit(submit)}>
					<OutlinedInput
						{...register("content", { required: true })}
						placeholder="What's on your mind?"
						fullWidth
						multiline
						minRows={3}
						sx={{ mb: 1 }}
					/>
					{error && (
						<Typography color="error" sx={{ mb: 1 }}>
							{error}
						</Typography>
					)}
					<Button
						type="submit"
						variant="contained"
						disabled={isSubmitting}
						fullWidth>
						{isSubmitting ? "Posting..." : "Post"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

