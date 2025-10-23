import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
	Box,
	Typography,
	Checkbox,
	Button,
	IconButton,
	Chip,
	Paper,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
} from "@mui/material";
import { Star, CheckSquare } from "lucide-react";

export default function EmailList({
	emails,
	onSelectEmail,
	selectedEmail,
	onToggleFavourite,
	onMarkAsRead,
}) {
	const [selectedEmailIds, setSelectedEmailIds] = useState([]);

	useEffect(() => {
		console.log("Emails updated:", emails);
	});

	if (!emails.length) {
		return (
			<Typography
				variant="body2"
				color="text.secondary"
				sx={{ p: 2, textAlign: "center" }}
			>
				No emails found.
			</Typography>
		);
	}

	const handleCheckboxChange = (id) => {
		setSelectedEmailIds((prev) =>
			prev.includes(id)
				? prev.filter((emailId) => emailId !== id)
				: [...prev, id]
		);
	};

	const toggleSelectAll = () => {
		if (selectedEmailIds.length === emails.length) {
			setSelectedEmailIds([]);
		} else {
			setSelectedEmailIds(emails.map((mail) => mail.id));
		}
	};

	const markSelectedAsRead = () => {
		if (selectedEmailIds.length > 0) {
			onMarkAsRead(selectedEmailIds);
			setSelectedEmailIds([]);
		}
	};

	const getPriorityChipProps = (priority) => {
		switch (priority) {
			case 5:
				return { label: "High", color: "success", variant: "outlined" };
			case 4:
				return { label: "Medium", color: "warning", variant: "outlined" };
			case 3:
				return { label: "Normal", color: "primary", variant: "outlined" };
			default:
				return { label: "Low", color: "default", variant: "outlined" };
		}
	};

	return (
		<Paper
			elevation={3}
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				borderRadius: 3,
			}}
		>
			{/* Toolbar */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				px={2}
				py={1.5}
				borderBottom="1px solid"
				borderColor="divider"
			>
				<Box display="flex" alignItems="center" gap={1}>
					<Checkbox
						checked={
							selectedEmailIds.length === emails.length && emails.length > 0
						}
						onChange={toggleSelectAll}
					/>
					<Typography variant="body2" color="text.secondary" component="div">
						Select All
					</Typography>
				</Box>

				{selectedEmailIds.length > 0 && (
					<Button
						variant="contained"
						color="primary"
						startIcon={<CheckSquare size={16} />}
						onClick={markSelectedAsRead}
						size="small"
					>
						Mark as Read
					</Button>
				)}
			</Box>

			{/* Email List */}
			<List sx={{ overflowY: "auto", flex: 1 }}>
				{emails.map((mail) => {
					const isSelected = selectedEmail?.id === mail.id;
					const isUnread = !mail.read;
					const isChecked = selectedEmailIds.includes(mail.id);

					return (
						<React.Fragment key={mail.id}>
							<ListItem
								disablePadding
								sx={{
									backgroundColor: isSelected
										? "action.selected"
										: "background.paper",
									"&:hover": {
										backgroundColor: "action.hover",
									},
									borderRadius: 2,
									mx: 1,
									my: 0.5,
									transition: "0.2s",
								}}
							>
								<ListItemButton
									onClick={() => onSelectEmail(mail)}
									sx={{ alignItems: "flex-start", py: 1.5 }}
								>
									{/* Left Actions (Checkbox + Star) */}
									<Box
										display="flex"
										flexDirection="column"
										alignItems="center"
										mr={2}
									>
										<Checkbox
											checked={isChecked}
											onChange={(e) => {
												e.stopPropagation();
												handleCheckboxChange(mail.id);
											}}
											size="small"
										/>
										<IconButton
											size="small"
											onClick={(e) => {
												e.stopPropagation();
												onToggleFavourite(mail);
											}}
											color={mail.is_favourite ? "warning" : "default"}
										>
											<Star
												size={18}
												fill={mail.is_favourite ? "#f59e0b" : "transparent"}
											/>
										</IconButton>
									</Box>

									{/* Email Content */}
									<ListItemText
										primary={
											<Box
												display="flex"
												justifyContent="space-between"
												alignItems="center"
											>
												<Typography
													variant="subtitle2"
													fontWeight={isUnread ? 600 : 400}
													noWrap
													component="div"
												>
													{mail.from_addr}
												</Typography>
												<Typography
													variant="caption"
													color="text.secondary"
													component="div"
												>
													{dayjs(mail.created_at).format("MMM D")}
												</Typography>
											</Box>
										}
										secondary={
											<>
												{/* Subject and Priority */}
												<Box
													display="flex"
													justifyContent="space-between"
													alignItems="center"
												>
													<Typography
														variant="body2"
														fontWeight={isUnread ? 500 : 400}
														noWrap
														sx={{ maxWidth: "75%" }}
														component="div"
													>
														{mail.subject}
													</Typography>
													{mail.priority && (
														<Chip
															size="small"
															{...getPriorityChipProps(mail.priority)}
														/>
													)}
												</Box>

												{/* Email Preview */}
												<Typography
													variant="caption"
													color="text.secondary"
													noWrap
													sx={{ display: "block", mt: 0.5 }}
													component="div"
												>
													{mail.body}
												</Typography>
											</>
										}
									/>
								</ListItemButton>
							</ListItem>
							<Divider component="li" />
						</React.Fragment>
					);
				})}
			</List>
		</Paper>
	);
}
