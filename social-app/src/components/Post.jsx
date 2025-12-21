import {
	Avatar,
	Card,
	CardContent,
	Typography,
	Box,
	ButtonGroup,
	IconButton,
	Button,
} from "@mui/material";

import { green } from "@mui/material/colors";

import {
	FavoriteBorderOutlined as LikeIcon,
	ChatBubbleOutlineOutlined as CommentIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router";

export default function Post({ post }) {
	const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
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
				<Box
					sx={{
						display: "flex",
						mt: 2,
						justifyContent: "space-around",
					}}>
					<ButtonGroup>
						<IconButton>
							<LikeIcon color="error" />
						</IconButton>
						<Button
							size="sm"
							variant="text">
							0
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton>
							<CommentIcon />
						</IconButton>
						<Button
							size="sm"
							variant="text">
							{post.comments ? post.comments.length : 0}
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
