import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function RecipientsInput({ to, setTo, cc, setCc, bcc, setBcc }) {
	const [showCc, setShowCc] = useState(false);
	const [showBcc, setShowBcc] = useState(false);
	const [showInput, setShowInput] = useState(false);

	return (
		<div className="relative">
			{/* Main Recipients Field */}
			{!showInput && (
				<button
					onClick={() => setShowInput(true)}
					className="w-full px-4 py-2 text-sm outline-none border-b border-gray-200 text-left text-gray-600"
				>
					Recipients
				</button>
			)}
			{showInput && (
				<div className="flex items-center border-b border-gray-200">
					<input
						type="text"
						placeholder="To"
						value={to}
						onChange={(e) => setTo(e.target.value)}
						className="flex-1 px-4 py-2 text-sm outline-none focus:bg-gray-50"
					/>
					{/* CC / BCC Buttons */}
					<div className="flex items-center gap-2 px-2">
						{!showCc && (
							<button
								type="button"
								onClick={() => setShowCc(!showCc)}
								className={`text-xs text-gray-400`}
							>
								CC
							</button>
						)}

						{!showBcc && (
							<button
								type="button"
								onClick={() => setShowBcc(!showBcc)}
								className={`text-xs text-gray-400`}
							>
								BCC
							</button>
						)}
					</div>
				</div>
			)}

			{/* CC Field */}
			{showCc && (
				<div className="border-b border-gray-200">
					<input
						type="text"
						placeholder="CC"
						value={cc}
						onChange={(e) => setCc(e.target.value)}
						className="w-full px-4 py-2 text-sm outline-none focus:bg-gray-50"
					/>
				</div>
			)}

			{/* BCC Field */}
			{showBcc && (
				<div className="border-b border-gray-200">
					<input
						type="text"
						placeholder="BCC"
						value={bcc}
						onChange={(e) => setBcc(e.target.value)}
						className="w-full px-4 py-2 text-sm outline-none focus:bg-gray-50"
					/>
				</div>
			)}
		</div>
	);
}
