// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://127.0.0.1:5000",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
	// withCredentials: true,
});

// ✅ REQUEST
axiosInstance.interceptors.request.use(
	(config) => {
		try {
			const session = localStorage.getItem("session");
			if (session) {
				const { token } = JSON.parse(session);
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
			}
		} catch (error) {
			console.warn("Invalid session format:", error);
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// ✅ RESPONSE
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			const { status } = error.response;

			if (status === 401) {
				console.warn("Unauthorized: Redirecting to login");
				localStorage.removeItem("session");
				window.location.href = "/login";
			}
		} else {
			console.error("Network Error:", error.message);
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
