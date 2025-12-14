import {
	Avatar,
	Typography,
	Box,
} from "@mui/material";

import { grey } from "@mui/material/colors";


export default function Comment() {
	return (
		<Box sx={{ p: 2, border: "1px solid #66666680" }}>
			<Box sx={{ display: "flex", gap: 2 }}>
				<Avatar
					sx={{ width: 52, height: 52, background: grey[500] }}
				/>
				<Box>
					<Typography>Bob</Typography>
					<Typography color="success">a few seconds ago</Typography>
					<Typography sx={{ mt: 1 }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Id accusantium in et deserunt dolore suscipit
						dignissimos minus corrupti, rerum veniam, neque animi,
						quod nam expedita?
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
