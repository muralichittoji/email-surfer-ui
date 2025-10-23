import { useState, useContext } from "react";
import { fetchUsername } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { MailWarning } from "lucide-react";
import AuthContext from "../../../context/AuthContext";
import AuthCard from "../Common/AuthCard";

import {
	Box,
	Button,
	TextField,
	Typography,
	InputAdornment,
	IconButton,
	Alert,
} from "@mui/material";
import CustomTextField from "../../Ui/CustomTextField";

const Login = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { saveEmailStep } = useContext(AuthContext);

	const handleContinue = () => {
		if (!email.trim()) return;

		fetchUsername(email).then((res) => {
			console.log({ res });
			if (res?.exists === true) {
				setError("");
				saveEmailStep({
					email: res?.email,
					username: res?.username,
				});
				navigate("/password");
			} else {
				setError("Couldn’t find your account");
			}
		});
	};

	return (
		<AuthCard
			title="Sign in"
			subtitle="Continue to Mail Surfer"
			logo="/logo.png"
		>
			<Box
				display="flex"
				flexDirection="column"
				gap={3}
				alignItems="center"
				justifyContent="center"
				width="100%"
			>
				<CustomTextField
					label="Email or Username"
					placeholder="Enter your email or username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={error}
					helperText="Please check your email or username"
				/>

				{/* Error Alert */}
				{error && (
					<Alert
						severity="error"
						icon={<MailWarning size={18} />}
						sx={{ width: "100%" }}
					>
						{error}
					</Alert>
				)}

				{/* Actions Section */}
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="flex-end"
					width="100%"
					mt={2}
				>
					<Typography variant="body2" color="text.secondary">
						Don't remember username/email? <br />
						<Typography
							component="a"
							href="/"
							color="primary"
							sx={{ textDecoration: "none", cursor: "pointer" }}
						>
							Click here
						</Typography>
					</Typography>

					<Button
						variant="contained"
						color="primary"
						onClick={handleContinue}
						sx={{ px: 4, py: 1.2, textTransform: "none", borderRadius: 2 }}
					>
						Next
					</Button>
				</Box>
			</Box>
		</AuthCard>
	);
};

export default Login;
