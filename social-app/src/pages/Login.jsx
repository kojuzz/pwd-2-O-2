import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";

export default function Login() {
	return (
		<Box>
			<Typography variant="h3">Login</Typography>

            <Alert severity="warning" sx={{ mt: 2 }}>
                Something went wrong
            </Alert>

			<form>
				<OutlinedInput
					fullWidth
					placeholder="username"
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
					Login
				</Button>
			</form>
		</Box>
	);
}
