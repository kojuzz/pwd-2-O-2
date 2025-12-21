import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const api = "http://localhost:8800";

export default function Register() {
    const [registerError, setRegisterError] = useState(false);

    const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const create = async data => {
		const res = await fetch(`${api}/users`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if(!res.ok) {
            setRegisterError(true);
            return false;
        }

        navigate("/login");
	};

	return (
		<Box>
			<Typography variant="h3">Register</Typography>

			{registerError && (
				<Alert
					severity="warning"
					sx={{ mt: 2 }}>
					Something went wrong
				</Alert>
			)}

			<form onSubmit={handleSubmit(create)}>
				<OutlinedInput
					fullWidth
					placeholder="name"
					sx={{ mt: 2 }}
					{...register("name", { required: true })}
				/>
				{errors.name && (
					<Typography color="error">name is required</Typography>
				)}

				<OutlinedInput
					fullWidth
					placeholder="username"
					sx={{ mt: 2 }}
					{...register("username", { required: true })}
				/>
				{errors.username && (
					<Typography color="error">username is required</Typography>
				)}

				<OutlinedInput
					fullWidth
					placeholder="bio"
					sx={{ mt: 2 }}
					{...register("bio")}
				/>

				<OutlinedInput
					fullWidth
					type="password"
					placeholder="password"
					sx={{ mt: 2 }}
					{...register("password", { required: true })}
				/>
				{errors.password && (
					<Typography color="error">password is required</Typography>
				)}

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
