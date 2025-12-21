import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useApp } from "../AppProvider";

const api = "http://localhost:8800";

export default function Login() {
    const [loginError, setLoginError] = useState(false);

    const { setAuth } = useApp();

    const navigate = useNavigate();

    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

    const login = async data => {
        const res = await fetch(`${api}/users/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(!res.ok) {
            setLoginError(true);
            return false;
        }

        const { user, token } = await res.json();
        localStorage.setItem("token", token);
        
        setAuth(user);
        navigate("/");
    }

	return (
		<Box>
			<Typography variant="h3">Login</Typography>

			{loginError && (
				<Alert
					severity="warning"
					sx={{ mt: 2 }}>
					Unable to login
				</Alert>
			)}

			<form onSubmit={handleSubmit(login)}>
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
					Login
				</Button>
			</form>
		</Box>
	);
}
