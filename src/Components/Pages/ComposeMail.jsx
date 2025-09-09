import { useState } from "react";
import { X, Paperclip, Smile } from "lucide-react";
import RecipientsInput from "./Common/Recipients";

export default function ComposeMail({ onClose, onSend }) {
	const [subject, setSubject] = useState("");
	const [body, setBody] = useState("");
	const [attachments, setAttachments] = useState([]);
	const [to, setTo] = useState("");
	const [cc, setCc] = useState("");
	const [bcc, setBcc] = useState("");

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);

		const mappedFiles = files.map((file) => ({
			filename: file.name,
			url: URL.createObjectURL(file),
			file,
		}));

		setAttachments((prev) => [...prev, ...mappedFiles]);
	};

	const splitEmails = (value) => {
		return value
			.split(/[,\s]+/)
			.map((email) => email.trim())
			.filter((email) => email.length > 0);
	};

	const handleSend = () => {
		if (!to || !subject || !body) {
			return;
		}

		const mailData = {
			to: to.trim(),
			cc: splitEmails(cc),
			bcc: splitEmails(bcc),
			subject: subject.trim(),
			priority: 5,
			body: body.trim(),
			attachments: attachments.map((file) => ({
				filename: file.filename,
				url: file.url,
			})),
		};

		onSend(mailData);

		// // Clear form after sending
		// setTo("");
		// setCc("");
		// setBcc("");
		// setSubject("");
		// setBody("");
		// setAttachments([]);
	};

	return (
		<div className="fixed bottom-8 right-8 w-1/2 h-3/4 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50">
			{/* Header */}
			<div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-gray-50">
				<h3 className="text-sm font-semibold text-gray-700">New Message</h3>
				<button
					onClick={onClose}
					className="p-1 cursor-pointer transition"
					title="Close"
				>
					<X size={18} />
				</button>
			</div>

			{/* Recipient Section */}
			<RecipientsInput
				to={to}
				setTo={setTo}
				cc={cc}
				setCc={setCc}
				bcc={bcc}
				setBcc={setBcc}
			/>

			{/* Subject */}
			<input
				type="text"
				placeholder="Subject"
				value={subject}
				onChange={(e) => setSubject(e.target.value)}
				className="w-full px-4 py-2 text-sm border-b border-gray-200 outline-none focus:bg-gray-50"
			/>

			{/* Body */}
			<textarea
				placeholder="Write your message..."
				value={body}
				onChange={(e) => setBody(e.target.value)}
				className="flex-1 px-4 py-3 text-sm outline-none resize-none"
			/>

			{/* Footer Actions */}
			<div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
				<div className="flex items-center gap-2">
					{/* Send Button */}
					<button
						onClick={handleSend}
						className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
					>
						Send
					</button>

					{/* Attach File */}
					<label className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition">
						<Paperclip size={18} />
						<input
							type="file"
							multiple
							onChange={handleFileChange}
							className="hidden"
						/>
					</label>

					{/* Emoji Button (Optional) */}
					<button className="p-2 rounded-lg hover:bg-gray-200 transition">
						<Smile size={18} />
					</button>
				</div>

				{/* Display Attached Files */}
				{attachments.length > 0 && (
					<div className="text-xs text-gray-500">
						{attachments.length} file(s) attached
					</div>
				)}
			</div>
		</div>
	);
}
