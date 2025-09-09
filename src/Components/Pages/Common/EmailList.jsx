import React, { useState } from "react";
import dayjs from "dayjs";
import { Star, CheckSquare } from "lucide-react";

export default function EmailList({
	emails,
	onSelectEmail,
	selectedEmail,
	onToggleFavourite,
	onMarkAsRead,
}) {
	const [selectedEmailIds, setSelectedEmailIds] = useState([]);

	if (!emails.length) {
		return <div className="p-4 text-gray-500">No emails found.</div>;
	}

	// Handle selecting/deselecting individual emails
	const handleCheckboxChange = (id) => {
		setSelectedEmailIds((prev) =>
			prev.includes(id)
				? prev.filter((emailId) => emailId !== id)
				: [...prev, id]
		);
	};

	// Select all or deselect all
	const toggleSelectAll = () => {
		if (selectedEmailIds.length === emails.length) {
			setSelectedEmailIds([]);
		} else {
			setSelectedEmailIds(emails.map((mail) => mail.id));
		}
	};

	// Mark selected as read
	const markSelectedAsRead = () => {
		if (selectedEmailIds.length > 0) {
			onMarkAsRead(selectedEmailIds);
			setSelectedEmailIds([]); // Clear selection after marking as read
		}
	};

	const getPriorityColor = (priority) => {
		switch (priority) {
			case 5:
				return "bg-green-100 text-green-800 border-green-300"; // High
			case 4:
				return "bg-yellow-100 text-yellow-800 border-yellow-300"; // Medium
			case 3:
				return "bg-blue-100 text-blue-800 border-blue-300"; // Normal
			default:
				return "bg-gray-100 text-gray-700 border-gray-300"; // Low
		}
	};

	return (
		<div className="h-full flex flex-col">
			{/* Toolbar */}
			<div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-gray-50 h-10">
				<div className="flex items-center gap-3">
					{/* Select All Checkbox */}
					<input
						type="checkbox"
						checked={
							selectedEmailIds.length === emails.length && emails.length > 0
						}
						onChange={toggleSelectAll}
						className="cursor-pointer"
					/>
					<span className="text-sm text-gray-600">Select All</span>
				</div>

				{/* Mark as Read Button */}
				{selectedEmailIds.length > 0 && (
					<button
						onClick={markSelectedAsRead}
						className="flex items-center gap-2 cursor-pointer px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
					>
						<CheckSquare size={16} />
						Mark as Read
					</button>
				)}
			</div>

			{/* Email List */}
			<div className="divide-y divide-gray-200 overflow-y-auto flex-1">
				{emails.map((mail) => {
					const isSelected = selectedEmail?.id === mail.id;
					const isUnread = !mail.is_read;
					const isChecked = selectedEmailIds.includes(mail.id);

					return (
						<div
							key={mail.id}
							className={`flex items-start gap-3 p-4 cursor-pointer transition rounded-md mx-2 my-1.5 border shadow-sm hover:shadow-lg
                ${
									isSelected
										? "bg-blue-50 shadow-md border-blue-300"
										: "border-transparent"
								}
                ${isUnread ? "bg-white" : "bg-gray-100 hover:bg-gray-100"}
              `}
						>
							{/* Checkbox and Star */}
							<div className="flex gap-3 flex-col items-center mt-4">
								{/* Individual Checkbox */}
								<input
									type="checkbox"
									checked={isChecked}
									onChange={(e) => {
										e.stopPropagation();
										handleCheckboxChange(mail.id);
									}}
									className="cursor-pointer"
								/>

								{/* Favourite Star */}
								<button
									type="button"
									aria-label={
										mail.is_favourite
											? "Remove from favourites"
											: "Add to favourites"
									}
									onClick={(e) => {
										e.stopPropagation();
										onToggleFavourite(mail);
									}}
									className="text-gray-400 cursor-pointer hover:text-yellow-500 focus:outline-none"
								>
									<Star
										size={18}
										className={
											mail.is_favourite
												? "fill-yellow-500 text-yellow-500"
												: "fill-white"
										}
									/>
								</button>
							</div>

							{/* Email Details */}
							<div
								onClick={() => onSelectEmail(mail)}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => e.key === "Enter" && onSelectEmail(mail)}
								className="flex-1 min-w-0"
							>
								{/* Sender & Date */}
								<div className="flex justify-between items-center">
									<h4
										className={`truncate ${
											isUnread
												? "font-bold text-gray-900"
												: "font-medium text-gray-700"
										}`}
									>
										{mail.sender}
									</h4>
									<span className="text-xs text-gray-500">
										{dayjs(mail.created_at).format("MMM D")}
									</span>
								</div>

								{/* Subject & Priority */}
								<div className="flex justify-between items-center mt-1">
									<p
										className={`truncate max-w-[75%] ${
											isUnread ? "font-semibold text-gray-900" : "text-gray-700"
										}`}
									>
										{mail.subject}
									</p>
									{mail.priority && (
										<span
											className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
												mail.priority
											)}`}
										>
											{mail.priority === 5
												? "High"
												: mail.priority === 4
												? "Medium"
												: mail.priority === 3
												? "Normal"
												: "Low"}
										</span>
									)}
								</div>

								{/* Email Preview */}
								<p
									className={`text-xs truncate mt-1 ${
										isUnread ? "text-gray-700" : "text-gray-500"
									}`}
								>
									{mail.body}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
