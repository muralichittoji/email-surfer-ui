import { useEffect, useState } from "react";
import {
	fetchMails,
	// markAsRead,
	// markAsReadBulk,
	toggleFavourite,
} from "./api/apiService";
import useAuth from "../../hooks/useAuth";
import EmailList from "./Common/EmailList";
import EmailPreview from "./Common/EmailPreview";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Mailbox() {
	const { user, pendingUser } = useAuth();
	const [emails, setEmails] = useState([]);
	const [selectedEmail, setSelectedEmail] = useState(null);
	const [loading, setLoading] = useState(true);

	// Determine the current user
	const username = user?.user?.username || pendingUser?.username;

	// 🔹 Fetch emails from backend
	useEffect(() => {
		if (!username) return;

		const loadEmails = async () => {
			try {
				setLoading(true);
				const data = await fetchMails();

				// Normalize data (ensure consistent field names)
				const formatted = (data || []).map((mail) => ({
					id: mail.id,
					from_addr: mail.from_addr,
					to_addr: mail.to_addr,
					subject: mail.subject,
					body: mail.body || "This email contains a PDF attachment.",
					created_at: mail.created_at,
					updated_at: mail.updated_at,
					read: mail.read ?? false,
					is_favourite: mail.is_favourite ?? false,
					router: mail.router,
					status: mail.status,
					case_id: mail.case_id,
					pdf_sha256: mail.pdf_sha256,
					entities: mail.entities || {},
					top_categories: mail.top_categories || {},
					top_label: mail.top_label,
					top_score: mail.top_score,
					attachments: mail.pdf_sha256
						? [
								{
									name: `${mail.subject}.pdf`,
									url: `/api/pdf/${mail.pdf_sha256}`,
								},
						  ]
						: [],
				}));
				console.log("📨 Fetched mails:", formatted);
				setEmails(formatted);
			} catch (err) {
				console.error("❌ Failed to fetch mails:", err);
			} finally {
				setLoading(false);
			}
		};

		loadEmails();
	}, [username]);

	// 🔹 Handle selecting an email
	const handleSelectEmail = async (email) => {
		setSelectedEmail(email);

		// // Mark as read if unread
		// if (!email.read) {
		// 	try {
		// 		await markAsRead(email.id);
		// 		setEmails((prev) =>
		// 			prev.map((m) => (m.id === email.id ? { ...m, read: true } : m))
		// 		);
		// 	} catch (err) {
		// 		console.error("❌ Failed to mark email as read:", err);
		// 	}
		// }
	};

	// 🔹 Bulk mark as read
	const handleMarkAsRead = async (ids) => {
		if (!ids?.length) return;

		// // Optimistic UI update
		// setEmails((prev) =>
		// 	prev.map((email) =>
		// 		ids.includes(email.id) ? { ...email, read: true } : email
		// 	)
		// );

		// try {
		// 	if (ids.length === 1) await markAsRead(ids[0]);
		// 	else await markAsReadBulk(ids);
		// } catch (err) {
		// 	console.error("❌ Failed to mark emails as read:", err);
		// }
	};

	// 🔹 Toggle favourite
	const handleToggleFavourite = async (email) => {
		const newFavStatus = !email.is_favourite;

		// Optimistic UI update
		setEmails((prev) =>
			prev.map((m) =>
				m.id === email.id ? { ...m, is_favourite: newFavStatus } : m
			)
		);

		try {
			await toggleFavourite(email.id, newFavStatus);
		} catch (err) {
			console.error("❌ Failed to toggle favourite:", err);
		}
	};

	// 🔹 Loading state
	if (loading) {
		return (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				height="100%"
			>
				<CircularProgress />
				<Typography sx={{ ml: 2 }}>Loading emails...</Typography>
			</Box>
		);
	}

	return (
		<div className="flex flex-col lg:flex-row h-full overflow-hidden">
			{/* Email List */}
			<div
				className={`${
					selectedEmail ? "lg:w-1/2 w-full" : "w-full"
				} h-full overflow-y-auto`}
			>
				<EmailList
					emails={emails}
					onSelectEmail={handleSelectEmail}
					onToggleFavourite={handleToggleFavourite}
					onMarkAsRead={handleMarkAsRead}
					selectedEmail={selectedEmail}
				/>
			</div>

			{/* Email Preview */}
			{selectedEmail && (
				<div className="lg:w-1/2 w-full h-full overflow-y-auto">
					<EmailPreview
						email={selectedEmail}
						onClose={() => setSelectedEmail(null)}
					/>
				</div>
			)}
		</div>
	);
}
