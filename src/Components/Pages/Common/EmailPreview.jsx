import { useState } from "react";
import { X, FileText } from "lucide-react";
import dayjs from "dayjs";
import {
	Box,
	Typography,
	IconButton,
	Divider,
	Button,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Dialog,
	DialogTitle,
	DialogContent,
	CircularProgress,
} from "@mui/material";
import { fetchPdf } from "../api/apiService";

export default function EmailPreview({
	email,
	onClose,
	onDelete,
	onReply,
	onForward,
	onToggleFavourite,
}) {
	const [pdfUrl, setPdfUrl] = useState(null);
	const [loadingPdf, setLoadingPdf] = useState(false);
	const [pdfOpen, setPdfOpen] = useState(false);

	const viewPDF = async () => {
		try {
			setLoadingPdf(true);
			const blob = await fetchPdf(email.pdf_sha256);
			const url = window.URL.createObjectURL(
				new Blob([blob], { type: "application/pdf" })
			);
			setPdfUrl(url);
			setPdfOpen(true);
		} catch (error) {
			console.error("Error opening PDF:", error);
		} finally {
			setLoadingPdf(false);
		}
	};

	const handleClosePdf = () => {
		setPdfOpen(false);
		if (pdfUrl) {
			window.URL.revokeObjectURL(pdfUrl);
			setPdfUrl(null);
		}
	};

	return (
		<Card
			elevation={4}
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				borderRadius: 3,
				overflow: "hidden",
			}}
		>
			{/* Header */}
			<CardHeader
				title={
					<Typography variant="h6" fontWeight={700}>
						{email.subject}
					</Typography>
				}
				subheader={
					<Typography variant="body2" color="text.secondary">
						<span style={{ fontWeight: 500 }}>From:</span> {email.from_addr} •{" "}
						<span style={{ fontWeight: 500 }}>To:</span> {email.to_addr}
					</Typography>
				}
				action={
					<Box sx={{ display: "flex", gap: 1 }}>
						<IconButton
							onClick={() => onDelete(email.id)}
							color="error"
							size="small"
							title="Delete Email"
						>
							<X size={18} />
						</IconButton>
						<IconButton
							onClick={() => onToggleFavourite?.(email)}
							color={email.is_favourite ? "warning" : "default"}
							size="small"
							title="Toggle Favourite"
						>
							<FileText size={18} />
						</IconButton>
						<IconButton
							onClick={onClose}
							color="default"
							size="small"
							title="Close"
						>
							<X size={18} />
						</IconButton>
					</Box>
				}
				sx={{ px: 3, py: 2, borderBottom: "1px solid", borderColor: "divider" }}
			/>

			{/* Meta Info */}
			<Box
				sx={{
					px: 3,
					py: 1.5,
					bgcolor: "grey.50",
					borderBottom: "1px solid",
					borderColor: "divider",
				}}
			>
				<Typography variant="body2" color="text.secondary">
					<strong>Date:</strong>{" "}
					{dayjs(email.created_at).format("MMMM D, YYYY h:mm A")}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					<strong>Transaction ID:</strong> {email.txn_id || "N/A"}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					<strong>Account No:</strong> {email.account_no || "N/A"}
				</Typography>
			</Box>

			{/* Email Body */}
			<CardContent
				sx={{
					flex: 1,
					overflowY: "auto",
					px: 3,
					py: 2,
					color: "text.primary",
					whiteSpace: "pre-wrap",
					lineHeight: 1.7,
				}}
			>
				{"Alert Here is an overview of Transaction: " + email.subject}
			</CardContent>

			{/* Gmail-style PDF Attachment Preview */}
			{email.pdf_sha256 && (
				<CardContent sx={{ px: 3, py: 2 }}>
					<Box
						onClick={viewPDF}
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 2,
							p: 2,
							border: "1px solid #e0e0e0",
							borderRadius: 2,
							cursor: "pointer",
							transition: "background 0.2s ease",
							"&:hover": {
								backgroundColor: "#f9f9f9",
							},
						}}
					>
						{/* PDF Thumbnail */}
						<Box
							sx={{
								width: 60,
								height: 80,
								border: "1px solid #ddd",
								borderRadius: 1,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "#fafafa",
								flexShrink: 0,
							}}
						>
							<FileText size={30} color="#d32f2f" />
						</Box>

						{/* PDF Info */}
						<Box sx={{ flexGrow: 1 }}>
							<Typography variant="body1" fontWeight={500}>
								{email.subject || "Attachment.pdf"}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								PDF Document • Click to view
							</Typography>
						</Box>
					</Box>
				</CardContent>
			)}

			<Divider />

			{/* Footer Actions */}
			<CardActions
				sx={{
					display: "flex",
					justifyContent: "space-around",
					bgcolor: "grey.50",
					px: 2,
					py: 1.5,
				}}
			>
				<Button
					startIcon={<X />}
					variant="contained"
					color="primary"
					onClick={() => onReply(email)}
					sx={{ textTransform: "none", borderRadius: 2 }}
				>
					Reply
				</Button>
				<Button
					startIcon={<FileText />}
					variant="outlined"
					color="primary"
					onClick={() => onForward(email)}
					sx={{ textTransform: "none", borderRadius: 2 }}
				>
					Forward
				</Button>
			</CardActions>

			{/* PDF Dialog */}
			<Dialog open={pdfOpen} onClose={handleClosePdf} maxWidth="lg" fullWidth>
				<DialogTitle>
					PDF Preview
					<IconButton
						aria-label="close"
						onClick={handleClosePdf}
						sx={{ position: "absolute", right: 8, top: 8 }}
					>
						<X />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>
					{loadingPdf ? (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "500px",
							}}
						>
							<CircularProgress />
						</Box>
					) : (
						pdfUrl && (
							<iframe
								src={pdfUrl}
								width="100%"
								height="600px"
								title="PDF Viewer"
								style={{ border: "none" }}
							/>
						)
					)}
				</DialogContent>
			</Dialog>
		</Card>
	);
}
