import {
	X,
	Trash2,
	Reply,
	Forward,
	BookmarkCheckIcon,
	Bookmark,
} from "lucide-react";
import dayjs from "dayjs";

export default function EmailPreview({
	email,
	onClose,
	onDelete,
	onReply,
	onForward,
}) {
	if (!email) return null;

	return (
		<div className="h-full m- flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
			{/* Header */}
			<div className="flex justify-between items-center border-b px-6 py-4">
				<div>
					<h2 className="text-xl font-bold text-gray-800">{email.subject}</h2>
					<p className="text-sm text-gray-500">
						<span className="font-medium text-gray-700">From:</span>{" "}
						{email.sender} •{" "}
						<span className="font-medium text-gray-700">To:</span>{" "}
						{email.receiver}
					</p>
				</div>

				{/* Action Buttons - Close & Delete */}
				<div className="flex items-center gap-2">
					{/* Delete Button */}
					<button
						onClick={() => onDelete(email.id)}
						className="p-2 hover:text-red-700 text-red-400 cursor-pointer rounded-full transition"
						title="Delete Email"
					>
						<Trash2 size={20} />
					</button>

					{/* Bookmark Button */}
					<button
						onClick={() => onDelete(email.id)}
						className="p-2 text-gray-500 hover:text-yellow-600 cursor-pointer rounded-full transition"
						title="Delete Email"
					>
						<Bookmark size={20} className="hover:fill-yellow-500" />
					</button>

					{/* Close Button */}
					<button
						onClick={onClose}
						className="p-2 hover:text-black text-gray-500 cursor-pointer rounded-full transition"
						title="Close"
					>
						<X size={20} />
					</button>
				</div>
			</div>

			{/* Meta Info */}
			<div className="px-6 py-4 bg-gray-50 border-b">
				<p className="text-sm text-gray-600">
					<span className="font-medium">Date:</span>{" "}
					{dayjs(email.created_at).format("MMMM D, YYYY h:mm A")}
				</p>
				<p className="text-sm text-gray-600">
					<span className="font-medium">Transaction ID:</span>{" "}
					{email.txn_id || "N/A"}
				</p>
				<p className="text-sm text-gray-600">
					<span className="font-medium">Account No:</span>{" "}
					{email.account_no || "N/A"}
				</p>
			</div>

			{/* Email Body */}
			<div className="flex-1 overflow-y-auto px-6 py-4 text-gray-800 whitespace-pre-wrap leading-relaxed">
				{email.body}
			</div>

			{/* Footer Actions */}
			<div className="border-t px-6 py-4 flex justify-around gap-4 bg-gray-50">
				<button
					onClick={() => onReply(email)}
					className="w-85 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 cursor-pointer transition"
				>
					<Reply size={18} />
					Reply
				</button>

				<button
					onClick={() => onForward(email)}
					className="w-85 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 cursor-pointer transition"
				>
					<Forward size={18} />
					Forward
				</button>
			</div>
		</div>
	);
}
