import { useState } from "react";

export default function FilterModal({ onClose, onApply }) {
	const [formData, setFormData] = useState({
		from: "",
		to: "",
		subject: "",
		hasWords: "",
		doesntHave: "",
		sizeFilter: "greater than",
		sizeValue: "",
		dateWithin: "1 day",
		date: "",
		searchLocation: "All Mail",
		priority: "",
		hasAttachment: false,
		excludeChats: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleApply = () => {
		onApply(formData);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
			<div className="bg-white w-[550px] rounded-lg shadow-lg p-6">
				<h2 className="text-lg font-semibold mb-4">Advanced Filters</h2>

				<div className="space-y-4">
					{/* From */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							From
						</label>
						<input
							type="text"
							name="from"
							value={formData.from}
							onChange={handleChange}
							className="w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
							placeholder="sender@example.com"
						/>
					</div>

					{/* To */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							To
						</label>
						<input
							type="text"
							name="to"
							value={formData.to}
							onChange={handleChange}
							className="w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
							placeholder="receiver@example.com"
						/>
					</div>

					{/* Subject */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Subject
						</label>
						<input
							type="text"
							name="subject"
							value={formData.subject}
							onChange={handleChange}
							className="w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
							placeholder="Email subject"
						/>
					</div>

					{/* Has the words */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Has the words
						</label>
						<input
							type="text"
							name="hasWords"
							value={formData.hasWords}
							onChange={handleChange}
							className="w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
							placeholder="Keywords separated by spaces"
						/>
					</div>

					{/* Doesn't have */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Doesn't have
						</label>
						<input
							type="text"
							name="doesntHave"
							value={formData.doesntHave}
							onChange={handleChange}
							className="w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
							placeholder="Exclude keywords"
						/>
					</div>

					{/* Size Filter */}
					<div className="flex items-center gap-2">
						<label className="block text-sm font-medium text-gray-700 w-16">
							Size
						</label>
						<select
							name="sizeFilter"
							value={formData.sizeFilter}
							onChange={handleChange}
							className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="greater than">greater than</option>
							<option value="less than">less than</option>
						</select>
						<input
							type="number"
							name="sizeValue"
							value={formData.sizeValue}
							onChange={handleChange}
							className="border rounded px-3 py-1 text-sm w-20 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Size"
						/>
						<span className="text-sm text-gray-600">MB</span>
					</div>

					{/* Date Filter */}
					<div className="flex items-center gap-2">
						<label className="block text-sm font-medium text-gray-700 w-16">
							Date within
						</label>
						<select
							name="dateWithin"
							value={formData.dateWithin}
							onChange={handleChange}
							className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="1 day">1 day</option>
							<option value="1 week">1 week</option>
							<option value="1 month">1 month</option>
						</select>
						<input
							type="date"
							name="date"
							value={formData.date}
							onChange={handleChange}
							className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					{/* Search Location */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Search
						</label>
						<select
							name="searchLocation"
							value={formData.searchLocation}
							onChange={handleChange}
							className="w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="All Mail">All Mail</option>
							<option value="Inbox">Inbox</option>
							<option value="Sent">Sent</option>
							<option value="Drafts">Drafts</option>
							<option value="Spam">Spam</option>
						</select>
					</div>

					{/* Priority Filter */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Priority
						</label>
						<select
							name="priority"
							value={formData.priority}
							onChange={handleChange}
							className="w-full border rounded px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">Any</option>
							<option value="1">Level 1</option>
							<option value="2">Level 2</option>
							<option value="3">Level 3</option>
							<option value="4">Level 4</option>
							<option value="5">Level 5</option>
						</select>
					</div>

					{/* Checkboxes */}
					<div className="flex items-center gap-6">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								name="hasAttachment"
								checked={formData.hasAttachment}
								onChange={handleChange}
								className="w-4 h-4"
							/>
							<span className="text-sm">Has attachment</span>
						</label>

						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								name="excludeChats"
								checked={formData.excludeChats}
								onChange={handleChange}
								className="w-4 h-4"
							/>
							<span className="text-sm">Don't include chats</span>
						</label>
					</div>
				</div>

				{/* Footer */}
				<div className="mt-6 flex justify-between">
					<button
						onClick={onClose}
						className="px-4 py-2 border rounded hover:bg-gray-100"
					>
						Close
					</button>
					<div className="space-x-2">
						<button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
							Create Filter
						</button>
						<button
							onClick={handleApply}
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Search
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
