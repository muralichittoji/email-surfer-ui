import { useState } from "react";
import { Box, Button } from "@mui/material";
import CustomTextField from "../../Ui/CustomTextField";

export default function RecipientsInput({ to, setTo, cc, setCc, bcc, setBcc }) {
	const [showCc, setShowCc] = useState(false);
	const [showBcc, setShowBcc] = useState(false);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			{/* To Field */}
			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<CustomTextField
					placeholder="To"
					value={to}
					onChange={(e) => setTo(e.target.value)}
					fullWidth
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: "10px",
							height: 40,
						},
					}}
				/>

				{/* CC/BCC Toggles */}
				{!showCc && (
					<Button
						onClick={() => setShowCc(true)}
						size="small"
						sx={{
							minWidth: "unset",
							color: "text.secondary",
							fontSize: 12,
							textTransform: "none",
						}}
					>
						Cc
					</Button>
				)}
				{!showBcc && (
					<Button
						onClick={() => setShowBcc(true)}
						size="small"
						sx={{
							minWidth: "unset",
							color: "text.secondary",
							fontSize: 12,
							textTransform: "none",
						}}
					>
						Bcc
					</Button>
				)}
			</Box>

			{/* CC Field */}
			{showCc && (
				<CustomTextField
					placeholder="Cc"
					value={cc}
					onChange={(e) => setCc(e.target.value)}
					fullWidth
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: "10px",
							height: 40,
						},
					}}
				/>
			)}

			{/* BCC Field */}
			{showBcc && (
				<CustomTextField
					placeholder="Bcc"
					value={bcc}
					onChange={(e) => setBcc(e.target.value)}
					fullWidth
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: "10px",
							height: 40,
						},
					}}
				/>
			)}
		</Box>
	);
}
