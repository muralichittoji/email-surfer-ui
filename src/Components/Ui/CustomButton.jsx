// components/CustomButton.jsx
import Button from "@mui/material/Button";

export default function CustomButton({ children, ...props }) {
	return (
		<Button
			variant="contained"
			sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}
			{...props}
		>
			{children}
		</Button>
	);
}
