import { lazy } from "react";

const Mailbox = lazy(() => import("../Pages/Mailbox"));

const mainRoutes = [
	{
		path: "/surfer/inbox",
		title: "Inbox",
		mailboxType: "inbox",
		component: Mailbox,
	},
	{
		path: "/surfer/spam",
		title: "Spam",
		mailboxType: "spam",
		component: Mailbox,
	},
	{
		path: "/surfer/trash",
		title: "Trash",
		mailboxType: "trash",
		component: Mailbox,
	},
	{
		path: "/surfer/sent",
		title: "Sent",
		mailboxType: "sent",
		component: Mailbox,
	},
	{
		path: "/surfer/important",
		title: "Important",
		mailboxType: "important",
		component: Mailbox,
	},
	{
		path: "/surfer/drafts",
		title: "Drafts",
		mailboxType: "drafts",
		component: Mailbox,
	},
];

export default mainRoutes;
