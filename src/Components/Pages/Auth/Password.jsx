import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { loginApi } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { MailWarning } from "lucide-react";
import AuthCard from "../Common/AuthCard";
import CustomTextField from "../../Ui/CustomTextField";

const Password = () => {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { pendingUser, login } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		console.log("Pending user from email step:", pendingUser);
	}, [pendingUser]);

	const handleLogin = () => {
		const userDetails = {
			username_email: pendingUser?.email,
			password,
		};

		if (password) {
			loginApi(userDetails)
				.then((res) => {
					if (res?.token) {
						login({
							token: res.token,
							user: {
								email: res.email,
								username: res.username,
							},
						});
						navigate("/surfer/inbox");
						setError("");
					} else {
						setError("Wrong password. Try again or click Forgot password.");
					}
				})
				.catch((err) => {
					console.error({ err });
					setError("Wrong password. Try again or click Forgot password.");
				});
		}
	};

	return (
		<AuthCard
			title="Welcome back"
			subtitle={
				<select
					className="w-full text-md border border-gray-300 rounded-3xl bg-white/60 backdrop-blur-sm mb-4 cursor-pointer"
					disabled
				>
					<option>{pendingUser?.email}</option>
				</select>
			}
			logo="/logo.png"
		>
			{/* Password field */}
			<CustomTextField
				type="password"
				placeholder="Enter your password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className={`w-full px-3 py-3 rounded-md border text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
					error ? "border-red-500 placeholder-red-500" : "border-gray-300"
				}`}
			/>

			{/* Error message */}
			{error && (
				<p className="text-red-600 text-sm flex items-center gap-2">
					<MailWarning className="w-4 h-4" />
					{error}
				</p>
			)}

			{/* Actions */}
			<div className="flex justify-between items-center mt-4">
				<button
					type="button"
					className="text-blue-600 hover:underline text-sm cursor-pointer"
				>
					Forgot password?
				</button>
				<button
					onClick={handleLogin}
					className="bg-blue-600 text-white px-5 py-2 font-medium hover:bg-blue-700 transition-colors w-30 cursor-pointer rounded-3xl"
				>
					Login
				</button>
			</div>
		</AuthCard>
	);
};

export default Password;
