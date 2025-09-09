import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { loginApi } from "../api/apiService";
import { useNavigate } from "react-router-dom";

const Password = () => {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		console.log({ user });
	}, []);

	const handleLogin = () => {
		const userDetails = {
			username_email: user?.user?.email,
			password: password,
		};
		if (password) {
			loginApi(userDetails)
				.then((res) => {
					console.log({ res });
					navigate("/surfer/inbox");
					setError("");
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
						<option>{user?.user?.email}</option>
					</select>
				</span>
				<span>
					<input
						type="text"
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
