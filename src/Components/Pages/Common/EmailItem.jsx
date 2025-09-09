import dayjs from "dayjs";

const EmailItem = ({ email, onClick, isSelected }) => {
	const isUnread = !email.read; // Adjust this line based on your actual property

	return (
		<div
			onClick={onClick}
			className={`p-4 border-b rounded-md cursor-pointer transition-shadow duration-200 
				hover:shadow-md bg-white 
				${isSelected ? "bg-blue-50" : ""}`}
		>
			<div className="flex justify-between items-center mb-1">
				<span className="font-medium text-gray-800">
					{email.sender || email.account_name}
				</span>
				<span className="text-xs text-gray-500">
					{dayjs(email.date || email.created_at).format("MMM D")}
				</span>
			</div>

			<div
				className={`text-sm truncate ${
					isUnread ? "font-semibold text-black" : "text-gray-600"
				}`}
			>
				{email.subject || email.transaction_desc}
			</div>

			{/* Optional: Unread indicator */}
			{isUnread && (
				<span className="inline-block mt-1 w-2 h-2 bg-blue-500 rounded-full" />
			)}
		</div>
	);
};

export default EmailItem;
