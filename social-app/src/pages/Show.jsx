import { Box, IconButton, OutlinedInput, Typography } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";

import { Send as AddCommentIcon } from "@mui/icons-material";

import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const api = "http://localhost:8800";

export default function Show() {
    const { id } = useParams();

    const {data: post, error, isLoading} = useQuery({
        queryKey: ["posts", id],
        queryFn: async () => {
            const res = await fetch(`${api}/posts/${id}`);
            return res.json();
        }
    });

    if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	if (error) {
		return <Typography>{error.message}</Typography>;
	}

	return (
		<Box>
			<Post post={post} />

			<Box sx={{ mb: 2 }}>
				<form>
					<OutlinedInput
						fullWidth
						placeholder="Your comment..."
						endAdornment={
							<IconButton>
								<AddCommentIcon />
							</IconButton>
						}
					/>
				</form>
			</Box>

			{post.comments.map(comment => {
                return <Comment key={comment.id} comment={comment} />
            })}
		</Box>
	);
}
