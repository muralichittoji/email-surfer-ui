import { useState, useContext } from "react";
import { fetchUsername } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { MailWarning } from "lucide-react";
import AuthContext from "../../../context/AuthContext";
import AuthCard from "../Common/AuthCard";

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
			{/* Email input */}
			<div className="flex flex-col justify-center items-center gap-16">
				<input
					type="text"
					placeholder="Email or username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={`w-full px-3 py-3 rounded-3xl border text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
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
				{/* <button type="button" className="text-blue-600 hover:underline text-sm">
					Create account
					</button> */}
				<div className="flex w-full items-end justify-between">
					<p className="text-sm">
						Dont remember username/email-id ?<br />
						<a href="/" className="text-blue-400">
							click here....
						</a>{" "}
					</p>
					<button
						onClick={handleContinue}
						className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700 transition-colors w-30 cursor-pointer"
					>
						Next
					</button>
				</div>
			</div>
		</AuthCard>
	);
};

export default Login;
