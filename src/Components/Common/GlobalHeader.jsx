import { useState } from "react";
import {
	ChevronDown,
	Filter,
	LogOut,
	Menu,
	Settings,
	UserRound,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function GlobalHeader({
	searchQuery,
	setSearchQuery,
	onFilterOpen,
	isSidebar,
}) {
	const { user, logout } = useAuth();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<header className="flex items-center justify-between p-4 bg-blue-50">
			{/* Search Bar */}
			<div className="flex w-full gap-2">
				<button
					className="lg:display-none cursor-pointer"
					onClick={() => isSidebar()}
				>
					<Menu />
				</button>
				<div className="flex-1 max-w-3/7 relative">
					<input
						type="text"
						placeholder="Search mails..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full border rounded-3xl px-4 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-300"
					/>
					<button
						onClick={onFilterOpen}
						className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
					>
						<Filter size={20} />
					</button>
				</div>
			</div>
			{/* User Dropdown */}
			<div className="relative ml-4">
				<button
					onClick={() => setDropdownOpen(!dropdownOpen)}
					className="flex items-center gap-2 text-gray-700 mr-5 hover:text-gray-900 cursor-pointer"
				>
					<span>{user?.user?.username || "User"}</span>
					<ChevronDown size={18} />
				</button>

				{dropdownOpen && (
					<div className="absolute right-0 mt-2 w-40 bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden animate-gradient">
						<button className="cursor-pointer w-full px-3 py-2 text-left hover:bg-blue-50 border-b border-gray-200 flex items-center gap-3">
							<UserRound size={20} /> Profile
						</button>
						<button className="cursor-pointer w-full px-3 py-2 text-left hover:bg-blue-50 border-b border-gray-200 flex items-center gap-3">
							<Settings size={20} /> Settings
						</button>
						<button
							className="cursor-pointer w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3"
							onClick={handleLogout}
						>
							<LogOut size={20} /> Logout
						</button>
					</div>
				)}
			</div>
		</header>
	);
}
