import dayjs from "dayjs";
import {
	Box,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
	Badge,
} from "@mui/material";

const EmailItem = ({ email, onClick, isSelected }) => {
	const isUnread = !email.is_read; // updated field name (backend may differ)

	return (
		<ListItem
			disablePadding
			sx={{
				borderBottom: "1px solid #e5e7eb",
				bgcolor: isSelected ? "action.hover" : "background.paper",
				transition: "box-shadow 0.2s ease",
				"&:hover": { boxShadow: 2 },
				borderRadius: 1,
				mt: 0.5,
			}}
		>
			<ListItemButton
				onClick={onClick}
				sx={{
					borderRadius: 1,
					alignItems: "flex-start",
					py: 1.5,
				}}
			>
				<Box sx={{ flex: 1 }}>
					{/* Header: From + Date */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 0.5,
						}}
					>
						<Typography
							variant="body1"
							fontWeight={isUnread ? 600 : 500}
							color="text.primary"
							noWrap
						>
							{email.from_addr || "Unknown Sender"}
						</Typography>

						<Typography variant="caption" color="text.secondary">
							{dayjs(email.created_at).format("MMM D")}
						</Typography>
					</Box>

					{/* Subject */}
					<ListItemText
						primaryTypographyProps={{
							variant: "body2",
							noWrap: true,
							fontWeight: isUnread ? 600 : 400,
							color: isUnread ? "text.primary" : "text.secondary",
						}}
						primary={email.subject || "No subject"}
					/>

					{/* Optional unread indicator */}
					{isUnread && (
						<Badge
							variant="dot"
							color="primary"
							sx={{
								mt: 0.5,
								"& .MuiBadge-dot": {
									width: 8,
									height: 8,
								},
							}}
						/>
					)}
				</Box>
			</ListItemButton>
		</ListItem>
	);
};

export default EmailItem;
