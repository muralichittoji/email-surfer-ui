// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	// Load session from localStorage on app start
	useEffect(() => {
		const savedSession = localStorage.getItem("session");
		if (savedSession) {
			setUser(JSON.parse(savedSession));
		}
	}, []);

	const login = (emailOrUsername) => {
		const token = Math.random().toString(36).substring(2); // Fake token for now

		const userData = {
			token,
			user: emailOrUsername,
		};

		// Save to state + localStorage
		setUser(userData);
		localStorage.setItem("session", JSON.stringify(userData));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("session");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
