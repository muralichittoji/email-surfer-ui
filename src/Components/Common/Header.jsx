import { useState } from "react";
import { Search, Filter, Star, ChevronDown } from "lucide-react";

export default function Header({
	onFilterChange = () => {},
	onPriorityChange = () => {},
	selectedPriority = null,
	totalEmails = 0,
	selectedEmails = [],
	onToggleSelectAll = () => {},
	searchQuery = "",
	setSearchQuery = () => {},
}) {
	const [priorityMenuOpen, setPriorityMenuOpen] = useState(false);

	return (
		<div className="bg-white border-b px-4 py-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
			{/* Left Section: Bulk Select + Filters */}
			<div className="flex items-center gap-3 flex-wrap">
				{/* Select All Checkbox */}
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						checked={
							selectedEmails?.length > 0
								? `${selectedEmails.length} selected`
								: `${totalEmails} total`
						}
						onChange={onToggleSelectAll}
						className="w-4 h-4 cursor-pointer"
					/>
					<span className="text-sm text-gray-600">
						{selectedEmails.length > 0
							? `${selectedEmails.length} selected`
							: `${totalEmails} total`}
					</span>
				</div>

				{/* Filters: All, Read, Unread */}
				<div className="flex items-center gap-2">
					<button
						onClick={() => onFilterChange("all")}
						className="px-3 py-1 text-sm rounded hover:bg-gray-100"
					>
						All
					</button>
					<button
						onClick={() => onFilterChange("read")}
						className="px-3 py-1 text-sm rounded hover:bg-gray-100"
					>
						Read
					</button>
					<button
						onClick={() => onFilterChange("unread")}
						className="px-3 py-1 text-sm rounded hover:bg-gray-100"
					>
						Unread
					</button>
					<button
						onClick={() => onFilterChange("starred")}
						className="px-3 py-1 text-sm rounded hover:bg-gray-100 flex items-center gap-1"
					>
						<Star size={16} className="text-yellow-500" />
						Starred
					</button>
				</div>

				{/* Priority Dropdown */}
				<div className="relative">
					<button
						onClick={() => setPriorityMenuOpen(!priorityMenuOpen)}
						className="flex items-center gap-2 px-3 py-1 text-sm rounded hover:bg-gray-100"
					>
						<Filter size={16} />
						Priority
						<ChevronDown size={16} />
					</button>

					{priorityMenuOpen && (
						<div className="absolute left-0 mt-1 w-32 bg-white border rounded shadow-md z-10">
							{[1, 2, 3, 4, 5].map((level) => (
								<button
									key={level}
									onClick={() => {
										onPriorityChange(level);
										setPriorityMenuOpen(false);
									}}
									className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
										selectedPriority === level
											? "bg-gray-100 font-semibold"
											: ""
									}`}
								>
									Level {level}
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Right Section: Search */}
			<div className="relative w-full md:w-64">
				<Search
					className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
					size={18}
				/>
				<input
					type="text"
					placeholder="Search mail"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full pl-10 pr-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
		</div>
	);
}
