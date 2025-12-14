import { Box, IconButton, OutlinedInput } from "@mui/material";
import Post from "../components/Post";
import Comment from "../components/Comment";

import { Send as AddCommentIcon } from "@mui/icons-material";

export default function Show() {
	return (
		<Box>
			<Post />

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

			<Comment />
			<Comment />
		</Box>
	);
}
