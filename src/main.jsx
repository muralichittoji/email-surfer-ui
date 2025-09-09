import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import axios from "axios";

axios.interceptors.request.use((req) => {
	document.body.classList.add("loading-indicator");
	// const token = localStorage.getItem("token");
	// const userString = localStorage.getItem("user");
	req.headers["Content-Type"] = "application/json";
});

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</StrictMode>
);
