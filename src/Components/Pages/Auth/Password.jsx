import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { loginApi } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { MailWarning } from "lucide-react";

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
						// ✅ update context
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
						setError("Password is invalid");
					}
				})
				.catch((err) => {
					console.error({ err });
					setError("Password is invalid");
				});
		}
	};

	return (
		<div className="flex h-screen items-center bg-gray-100 justify-center">
			<div className="p-6 bg-white shadow-md rounded-2xl h-99 w-190 grid grid-cols-2 items-center gap-3">
				<span className="text-4xl font-bold mb-4">
					<p className="text-xl font-normal mt-3">Welcome back</p>
					<select className="text-lg border border-gray-300 rounded-lg">
						<option>{pendingUser?.email}</option>
					</select>
				</span>
				<span>
					<input
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={`w-full p-2 border border-gray-300 rounded-xl mb-4 ${
							error.length > 0 ? "border-red-600 placeholder-red-600" : ""
						}`}
					/>
					<span className="flex items-center justify-end mt-5">
						<button
							onClick={handleLogin}
							className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-25 rounded-3xl cursor-pointer"
						>
							Login
						</button>
					</span>
					{error.length > 0 && (
						<p className="text-red-600 text-md font-md flex gap-2">
							<MailWarning /> {error}
						</p>
					)}
				</span>
			</div>
		</div>
	);
};

export default Password;
