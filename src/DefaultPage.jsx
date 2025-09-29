import { useState } from "react";
import Sidebar from "./Components/Navigation/Sidebar";
import Mailbox from "./Components/Pages/Mailbox";
import FilterModal from "./Components/Common/FilterModel";
import ComposeMail from "./Components/Pages/ComposeMail";
import { mailSender } from "./Components/Pages/api/apiService";
import GlobalHeader from "./Components/Common/GlobalHeader";

export default function DefaultPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [filterOpen, setFilterOpen] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [composeOpen, setComposeOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("inbox");

	const username = "Manoj Mehta";

	const sendMail = (mailData) => {
		console.log("Sending email:", mailData);
		mailSender(mailData)
			.then((res) => {
				console.log({ res });
				setComposeOpen(false);
			})
			.catch((err) => {
				console.error({ err });
			});
	};

	return (
		<div className="h-screen flex flex-col bg-blue-50 overflow-hidden">
			{/* Global Header */}
			<div className="flex-none">
				<GlobalHeader
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					onFilterOpen={() => setFilterOpen(true)}
					onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
					isSidebar={() => setSidebarOpen(!sidebarOpen)}
				/>
			</div>

			{/* Main Layout */}
			<div className="flex-1 overflow-hidden flex">
				{sidebarOpen && (
					<Sidebar
						isOpen={sidebarOpen}
						onClose={() => setSidebarOpen(false)}
						selectedCategory={selectedCategory}
						onComposeOpen={() => setComposeOpen(true)}
						setSelectedCategory={setSelectedCategory}
					/>
				)}

				{/* Mailbox */}
				<div className="flex-1 overflow-hidden">
					<div className="bg-white rounded-3xl h-full m-2">
						<Mailbox
							username={username}
							searchQuery={searchQuery}
							selectedCategory={selectedCategory}
						/>
					</div>
				</div>
			</div>

			{composeOpen && (
				<ComposeMail
					onClose={() => setComposeOpen(false)}
					onSend={(mailData) => {
						sendMail(mailData);
					}}
				/>
			)}

			{/* Filter Modal */}
			{filterOpen && <FilterModal onClose={() => setFilterOpen(false)} />}
		</div>
	);
}
