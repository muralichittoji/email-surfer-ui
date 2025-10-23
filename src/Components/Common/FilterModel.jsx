import { useState } from "react";
import CustomTextField from "../Ui/CustomTextField";
import CustomButton from "../Ui/CustomButton";

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
			<div className="bg-white w-1/3 rounded-lg shadow-lg p-6">
				<h2 className="text-lg font-semibold mb-4">Advanced Filters</h2>

				<div className="space-y-4 gap-4 flex flex-col text-sm">
					{/* From */}
					<CustomTextField
						height={40}
						label="From"
						name="from"
						value={formData.from}
						onChange={handleChange}
						placeholder="sender@example.com"
						sx={{ padding: 0 }}
						inputSx={{ padding: 0 }}
					/>

					{/* To */}
					<CustomTextField
						height={40}
						label="To"
						name="to"
						value={formData.to}
						onChange={handleChange}
						placeholder="receiver@example.com"
					/>

					{/* Subject */}
					<CustomTextField
						height={40}
						label="Subject"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						placeholder="Email subject"
					/>

					{/* Has the words */}
					<CustomTextField
						height={40}
						label="Has the words"
						name="hasWords"
						value={formData.hasWords}
						onChange={handleChange}
						placeholder="Keywords separated by spaces"
					/>

					{/* Doesn't have */}
					<CustomTextField
						height={40}
						label="Doesn't have"
						name="doesntHave"
						value={formData.doesntHave}
						onChange={handleChange}
						placeholder="Exclude keywords"
					/>

					{/* Size Filter */}
					<div className="flex items-center justify-start gap-2">
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
						<CustomTextField
							height={40}
							type="number"
							name="sizeValue"
							value={formData.sizeValue}
							onChange={handleChange}
							placeholder="Size"
							sx={{ width: 100, padding: 0 }} // styles on the TextField root
							inputSx={{ padding: 0 }}
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
						<CustomTextField
							height={40}
							type="date"
							name="date"
							value={formData.date}
							onChange={handleChange}
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
					<CustomButton onClick={onClose} variant="outlined" color="inherit">
						Close
					</CustomButton>

					<div className="gap-3 flex">
						<CustomButton color="secondary">Create Filter</CustomButton>

						<CustomButton onClick={handleApply} color="primary">
							Search
						</CustomButton>
					</div>
				</div>
			</div>
		</div>
	);
}
