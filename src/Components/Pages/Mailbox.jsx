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
	const { user } = useAuth();
	const [emails, setEmails] = useState([]);
	const [selectedEmail, setSelectedEmail] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch emails when user logs in
	useEffect(() => {
		if (!user?.user?.username) return;

		const loadEmails = async () => {
			try {
				setLoading(true);
				const data = await fetchMails(user.user.username);
				setEmails(data);
			} catch (err) {
				console.error("Failed to fetch mails:", err);
			} finally {
				setLoading(false);
			}
		};

		loadEmails();
	}, [user]);

	/**
	 * Handle selecting an email
	 * → Calls single mark as read if unread
	 */
	const handleSelectEmail = async (email) => {
		setSelectedEmail(email);

		if (!email.is_read) {
			try {
				await markAsRead(email.id); // ✅ Single API call
				setEmails((prev) =>
					prev.map((m) => (m.id === email.id ? { ...m, is_read: true } : m))
				);
			} catch (err) {
				console.error("Failed to mark email as read:", err);
			}
		}
	};

	/**
	 * Handle bulk marking as read
	 * → Decides whether to use single or bulk API
	 */
	const handleMarkAsRead = async (ids) => {
		if (!ids || ids.length === 0) return;

		try {
			// Optimistically update the UI
			setEmails((prevEmails) =>
				prevEmails.map((email) =>
					ids.includes(email.id) ? { ...email, is_read: true } : email
				)
			);

			if (ids.length === 1) {
				// ✅ Single Email → Single API
				await markAsRead(ids[0]);
			} else {
				// ✅ Multiple Emails → Bulk API
				await markAsReadBulk(ids);
			}
		} catch (err) {
			console.error("Failed to mark emails as read:", err);
		}
	};

	/**
	 * Toggle favourite
	 */
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

	/**
	 * Search + filter by category
	 */
	const filteredEmails = emails.filter((email) => {
		const matchesSearch =
			email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
			email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
			email.body.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesCategory =
			selectedCategory === "all" || email.category === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	if (loading) {
		return <div className="p-4">Loading emails...</div>;
	}

	return (
		<div className="flex h-full overflow-hidden">
			{/* Email List Section */}
			<div
				className={`${
					selectedEmail ? "w-1/3" : "w-full"
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

			{/* Email Preview Section */}
			{selectedEmail && (
				<div className="w-2/3 overflow-y-auto">
					<EmailPreview
						email={selectedEmail}
						onClose={() => setSelectedEmail(null)}
					/>
				</div>
			)}
		</div>
	);
}
