import { useEffect, useState } from "react";
import {
	fetchMails,
	markAsRead,
	markAsReadBulk,
	toggleFavourite,
} from "./api/apiService";
import useAuth from "../../hooks/useAuth";
import EmailList from "./Common/EmailList";
import EmailPreview from "./Common/EmailPreview";

export default function Mailbox({ searchQuery, selectedCategory }) {
	const { user, pendingUser } = useAuth();
	const [emails, setEmails] = useState([]);
	const [selectedEmail, setSelectedEmail] = useState(null);
	const [loading, setLoading] = useState(true);

	// Determine current user
	const username = user?.user?.username || pendingUser?.username;

	// Fetch emails when user logs in
	useEffect(() => {
		if (!username) return;

		const loadEmails = async () => {
			try {
				setLoading(true);
				const data = await fetchMails(username);
				setEmails(data || []);
			} catch (err) {
				console.error("Failed to fetch mails:", err);
			} finally {
				setLoading(false);
			}
		};

		loadEmails();
	}, [username]);

	// Handle selecting an email
	const handleSelectEmail = async (email) => {
		setSelectedEmail(email);
		if (!email.is_read) {
			try {
				await markAsRead(email.id);
				setEmails((prev) =>
					prev.map((m) => (m.id === email.id ? { ...m, is_read: true } : m))
				);
			} catch (err) {
				console.error("Failed to mark email as read:", err);
			}
		}
	};

	// Bulk mark as read
	const handleMarkAsRead = async (ids) => {
		if (!ids?.length) return;

		setEmails((prev) =>
			prev.map((email) =>
				ids.includes(email.id) ? { ...email, is_read: true } : email
			)
		);

		try {
			if (ids.length === 1) await markAsRead(ids[0]);
			else await markAsReadBulk(ids);
		} catch (err) {
			console.error("Failed to mark emails as read:", err);
		}
	};

	// Toggle favourite
	const handleToggleFavourite = async (email) => {
		const newFavStatus = !email.is_favourite;
		try {
			await toggleFavourite(email.id, newFavStatus);
			setEmails((prev) =>
				prev.map((m) =>
					m.id === email.id ? { ...m, is_favourite: newFavStatus } : m
				)
			);
		} catch (err) {
			console.error("Failed to toggle favourite:", err);
		}
	};

	// Search + category filter
	const filteredEmails = emails.filter((email) => {
		const subject = email.subject || "";
		const sender = email.sender || "";
		const body = email.body || "";

		const matchesSearch =
			subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
			sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
			body.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesCategory =
			selectedCategory === "all" || email.category === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	if (loading) return <div className="p-4">Loading emails...</div>;

	return (
		<div className="flex flex-col lg:flex-row h-full overflow-hidden">
			{/* Email List */}
			<div
				className={`${
					selectedEmail ? "lg:w-2/3 w-full" : "w-full"
				} h-full overflow-y-auto`}
			>
				<EmailList
					emails={filteredEmails}
					onSelectEmail={handleSelectEmail}
					onToggleFavourite={handleToggleFavourite}
					onMarkAsRead={handleMarkAsRead}
					selectedEmail={selectedEmail}
				/>
			</div>

			{/* Email Preview */}
			{selectedEmail && (
				<div className="lg:w-2/3 w-full h-full overflow-y-full">
					<EmailPreview
						email={selectedEmail}
						onClose={() => setSelectedEmail(null)}
					/>
				</div>
			)}
		</div>
	);
}
