import { useState } from "react";
import { fetchUsername } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { MailWarning } from "lucide-react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleContinue = () => {
		if (!email.trim()) return;
		fetchUsername(email).then((res) => {
			console.log({ res });
			if (res?.exists === true) {
				navigate("/password");
				setError("");
				login(res);
			} else {
				setError("Couldn’t find your Bank Account");
			}
		});
	};

	return (
		<div className="flex h-screen items-center bg-gray-100 justify-center">
			<div className="p-6 bg-white shadow-md rounded-2xl h-99 w-190 grid grid-cols-2 items-center gap-3">
				<span className="text-4xl font-bold mb-4">
					<h3>Sign-in</h3>
					<p className="text-xl font-normal mt-3">Welcome to mail surfer</p>
				</span>
				<span>
					<input
						type="text"
						placeholder="Enter email or username"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={`w-full p-2 border border-gray-300 rounded-xl mb-4 ${
							error.length > 0 ? "border-red-600 placeholder-red-600" : ""
						}`}
					/>
					<span className="flex items-center justify-end mt-5">
						<button
							onClick={handleContinue}
							className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-25 rounded-3xl cursor-pointer"
						>
							next
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

export default Login;
