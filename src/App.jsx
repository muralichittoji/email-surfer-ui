import { Suspense } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import routes from "./Components/Navigation/routes";
import ProtectedRoute from "./Components/Navigation/ProtectedRoute";
import Loader from "./Components/Navigation/Loader";
import Login from "./Components/Pages/Auth/Login";
import DefaultPage from "./DefaultPage";
import Password from "./Components/Pages/Auth/Password";

const App = () => {
	return (
		<Router>
			<Suspense fallback={<Loader />}>
				<Routes>
					{/* Default route → redirect to login */}
					<Route path="/" element={<Navigate to="/login" replace />} />

					{/* Login Page */}
					<Route path="/login" element={<Login />} />
					<Route path="/password" element={<Password />} />
					{/* Surfer layout */}
					<Route path="/surfer" element={<DefaultPage />}>
						{/* Redirect /surfer to /surfer/inbox */}
						<Route index element={<Navigate to="/surfer/inbox" replace />} />

						{/* Protected Mail Routes */}
						{routes.map((route, index) => {
							const Component = route.component;
							return (
								<Route
									key={index}
									path={route.path.replace("/surfer/", "")} // important fix
									element={
										<ProtectedRoute>
											<Component />
										</ProtectedRoute>
									}
								/>
							);
						})}
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
