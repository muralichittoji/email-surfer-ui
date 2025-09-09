import { NavLink } from "react-router-dom";
import {
	Inbox,
	Star,
	Send,
	FileText,
	Trash2,
	AlertTriangle,
	X,
	Pen,
} from "lucide-react";

const navItems = [
	{
		key: "inbox",
		label: "Inbox",
		path: "/surfer/inbox",
		icon: <Inbox size={20} />,
	},
	{
		key: "important",
		label: "Important",
		path: "/surfer/important",
		icon: <Star size={20} />,
	},
	{
		key: "sent",
		label: "Sent",
		path: "/surfer/sent",
		icon: <Send size={20} />,
	},
	{
		key: "drafts",
		label: "Drafts",
		path: "/surfer/drafts",
		icon: <FileText size={20} />,
	},
	{
		key: "spam",
		label: "Spam",
		path: "/surfer/spam",
		icon: <AlertTriangle size={20} />,
	},
	{
		key: "trash",
		label: "Trash",
		path: "/surfer/trash",
		icon: <Trash2 size={20} />,
	},
];

export default function Sidebar({
	isOpen,
	onClose,
	selectedCategory,
	setSelectedCategory,
	onComposeOpen,
}) {
	return (
		<div className="h-full">
			{/* Mobile Backdrop */}
			{isOpen && (
				<button
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={onClose}
					aria-label="Close Sidebar"
				/>
			)}

			{/* Sidebar Container */}
			<aside
				className={`
          h-full w-64 bg-gray-100
          transform transition-transform duration-300
          fixed z-50 top-0 left-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0
        `}
			>
				{/* Header (Mobile Only) */}
				<div className="flex items-center justify-between p-4 border-b md:hidden">
					<h2 className="text-lg font-bold">Menu</h2>
					<button
						onClick={onClose}
						aria-label="Close Menu"
						className="p-1 hover:bg-gray-100 rounded"
					>
						<X size={24} />
					</button>
				</div>

				{/* Navigation Links */}
				<nav className="p-4 space-y-2 overflow-y-auto">
					<button
						className="flex gap-3 p-3 rounded-lg text-black font-medium border border-gray-300 cursor-pointer hover:shadow-sm"
						onClick={onComposeOpen}
					>
						<Pen />
						Compose
					</button>
					{navItems.map((item) => (
						<NavLink
							key={item.key}
							to={item.path}
							onClick={() => {
								setSelectedCategory(item.key);
								onClose();
							}}
							className={({ isActive }) =>
								`flex items-start gap-3 px-3 py-2 rounded-lg transition text-gray-600 hover:bg-blue-100 hover:shadow-sm
                ${
									isActive || selectedCategory === item.key
										? "bg-blue-200 font-medium text-gray-900 hover:bg-blue-200"
										: ""
								}`
							}
						>
							{item.icon}
							<span>{item.label}</span>
						</NavLink>
					))}
				</nav>
			</aside>
		</div>
	);
}
