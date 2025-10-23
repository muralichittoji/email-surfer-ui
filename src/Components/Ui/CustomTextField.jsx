import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

const CustomTextField = ({
	label,
	value,
	onChange,
	placeholder,
	error,
	helperText,
	startIcon,
	endIcon,
	type = "text",
	sx, // Root TextField styles
	height = 50,
	inputSx, // Input element styles
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	// Determine final input type
	const inputType = type === "password" && showPassword ? "text" : type;

	return (
		<TextField
			fullWidth
			variant="outlined"
			label={label}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			error={Boolean(error)}
			helperText={error ? helperText || error : ""}
			sx={sx} // Root sx here
			slotProps={{
				input: {
					sx: {
						borderRadius: 80,
						height,
						...inputSx, // Input styles here
					},
					startAdornment: startIcon && (
						<InputAdornment position="start">
							<IconButton edge="start">{startIcon}</IconButton>
						</InputAdornment>
					),
					endAdornment: (
						<>
							{endIcon && (
								<InputAdornment position="end">
									<IconButton edge="end">{endIcon}</IconButton>
								</InputAdornment>
							)}

							{type === "password" && (
								<InputAdornment position="end">
									<IconButton
										onClick={() => setShowPassword((prev) => !prev)}
										edge="end"
									>
										{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
									</IconButton>
								</InputAdornment>
							)}
						</>
					),
				},
			}}
			type={inputType}
			{...props}
		/>
	);
};

export default CustomTextField;
