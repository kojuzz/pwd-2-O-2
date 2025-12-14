import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";

export default function Register() {
	return (
		<Box>
			<Typography variant="h3">Register</Typography>

			<Alert
				severity="warning"
				sx={{ mt: 2 }}>
				Something went wrong
			</Alert>

			<form>
				<OutlinedInput
					fullWidth
					placeholder="name"
					sx={{ mt: 2 }}
				/>
				<OutlinedInput
					fullWidth
					placeholder="username"
					sx={{ mt: 2 }}
				/>
				<OutlinedInput
					fullWidth
					placeholder="bio"
					sx={{ mt: 2 }}
				/>
				<OutlinedInput
					fullWidth
					type="password"
					placeholder="password"
					sx={{ mt: 2 }}
				/>
				<Button
					sx={{ mt: 2 }}
					variant="contained"
					type="submit"
					fullWidth>
					Register
				</Button>
			</form>
		</Box>
	);
}
