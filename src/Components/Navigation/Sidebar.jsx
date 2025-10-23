import {
	X,
	Pen,
	Inbox,
	Star,
	Send,
	FileText,
	Trash2,
	AlertTriangle,
} from "lucide-react";

const navItems = [
	{ key: "inbox", label: "Inbox", icon: <Inbox size={20} /> },
	{ key: "important", label: "Important", icon: <Star size={20} /> },
	{ key: "sent", label: "Sent", icon: <Send size={20} /> },
	{ key: "drafts", label: "Drafts", icon: <FileText size={20} /> },
	{ key: "spam", label: "Spam", icon: <AlertTriangle size={20} /> },
	{ key: "trash", label: "Trash", icon: <Trash2 size={20} /> },
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
			<aside
				className={`
          fixed top-0 left-0 h-full bg-blue-50 w-72 transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-64
        `}
			>
				{/* Header (mobile only) */}
				<div className="flex items-center justify-between p-4 border-b lg:hidden">
					<h2 className="text-lg font-bold">Menu</h2>
					<button
						onClick={onClose}
						className="p-1 hover:bg-gray-200 rounded cursor-pointer"
					>
						<X size={20} />
					</button>
				</div>

				{/* Compose Button */}
				<div className="p-4">
					<button
						onClick={onComposeOpen}
						className="flex items-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
					>
						<Pen size={16} />
						Compose
					</button>
				</div>

				{/* Navigation */}
				<nav className="p-4 space-y-1">
					{navItems.map((item) => (
						<button
							key={item.key}
							onClick={() => setSelectedCategory(item.key)}
							className={`
                flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-blue-100 cursor-pointer transition
                ${
									selectedCategory === item.key
										? "bg-blue-200 font-medium text-gray-900"
										: ""
								}
              `}
						>
							{item.icon}
							<span>{item.label}</span>
						</button>
					))}
				</nav>
			</aside>
		</div>
	);
}
