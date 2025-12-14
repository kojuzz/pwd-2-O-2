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

export default function Post() {
	const navigate = useNavigate();

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Avatar
						sx={{ width: 64, height: 64, background: green[500] }}
					/>
					<Box>
						<Typography>Alice</Typography>
						<Typography color="success">
							a few seconds ago
						</Typography>
						<Typography
							sx={{ mt: 1 }}
							onClick={() => navigate("/show")}>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Id accusantium in et deserunt dolore suscipit
							dignissimos minus corrupti, rerum veniam, neque
							animi, quod nam expedita? Delectus animi quas quidem
							exercitationem.
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
							10
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton>
							<CommentIcon />
						</IconButton>
						<Button
							size="sm"
							variant="text">
							5
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
