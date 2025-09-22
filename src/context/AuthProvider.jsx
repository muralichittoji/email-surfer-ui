// src/context/AuthProvider.jsx
import { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null); // fully logged-in user
	const [pendingUser, setPendingUser] = useState(null); // from email step only

	// Restore session on app start
	useEffect(() => {
		const savedSession = localStorage.getItem("session");
		if (savedSession) {
			setUser(JSON.parse(savedSession));
		}
	}, []);

	// Step 1: Save email validation result
	const saveEmailStep = useCallback((emailData) => {
		// emailData = { email, username, maybe userid }
		setPendingUser(emailData);
	}, []);

	// Step 2: Complete login with token
	const login = useCallback((authData) => {
		// authData = { token, user: { id, email, username, ... } }
		setUser(authData);
		localStorage.setItem("session", JSON.stringify(authData));
		setPendingUser(null); // clear intermediate state
	}, []);

	// Logout
	const logout = useCallback(() => {
		setUser(null);
		setPendingUser(null);
		localStorage.removeItem("session");
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user, // fully logged-in user
				pendingUser, // pre-login details from email step
				token: user?.token || null,
				isAuthenticated: !!user,
				saveEmailStep,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
