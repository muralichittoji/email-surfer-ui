import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	TextField,
	IconButton,
	InputAdornment,
	Menu,
	MenuItem,
	Typography,
	Box,
	Paper,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Filter,
	ChevronDown,
	UserRound,
	Settings,
	LogOut,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function GlobalHeader({
	searchQuery,
	setSearchQuery,
	onFilterOpen,
	isSidebar,
}) {
	const { user, logout } = useAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();

	const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<AppBar
			position="static"
			color="default"
			elevation={0}
			sx={{
				backgroundColor: "#f0f6ff",
				borderBottom: "1px solid #e0e0e0",
				px: 2,
			}}
		>
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				{/* Left Section: Menu + Search */}
				<Box
					sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}
				>
					<IconButton color="inherit" onClick={isSidebar}>
						<MenuIcon />
					</IconButton>

					{/* Search Bar */}
					<Paper
						component="form"
						sx={{
							display: "flex",
							alignItems: "center",
							flex: 1,
							maxWidth: 500,
							borderRadius: 50,
							pl: 2,
							pr: 1,
							backgroundColor: "#fff",
						}}
					>
						<TextField
							fullWidth
							variant="standard"
							placeholder="Search mails..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							InputProps={{
								disableUnderline: true,
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={onFilterOpen}>
											<Filter size={20} />
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								"& input": { padding: "8px 0", borderRadius: 50 },
							}}
						/>
					</Paper>
				</Box>

				{/* Right Section: User Dropdown */}
				<Box sx={{ ml: 3 }}>
					<IconButton
						onClick={handleMenuOpen}
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
							borderRadius: 50,
							px: 2,
							py: 1,
							backgroundColor: "#fff",
							border: "1px solid #e0e0e0",
							"&:hover": { backgroundColor: "#f3f3f3" },
						}}
					>
						<Typography variant="body2" sx={{ color: "text.primary" }}>
							{user?.user?.username || "User"}
						</Typography>
						<ChevronDown size={18} />
					</IconButton>

					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
						PaperProps={{
							sx: {
								borderRadius: 3,
								mt: 1.5,
								minWidth: 160,
								boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
							},
						}}
					>
						<MenuItem onClick={handleMenuClose}>
							<UserRound size={18} style={{ marginRight: 8 }} /> Profile
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<Settings size={18} style={{ marginRight: 8 }} /> Settings
						</MenuItem>
						<MenuItem
							onClick={handleLogout}
							sx={{
								color: "error.main",
								"&:hover": { backgroundColor: "#ffebee" },
							}}
						>
							<LogOut size={18} style={{ marginRight: 8 }} /> Logout
						</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
