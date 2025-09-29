const AuthCard = ({ title, subtitle, children }) => {
	return (
		<div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 glow animate-gradient">
			<div className="w-1/2 bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex items-center h-2/5 gap-3">
				<div className="flex flex-col items-start justify-start gap-4 h-4/5 w-1/2">
					{/* Logo */}
					<svg
						width={70}
						height={70}
						viewBox="0 0 24 24"
						fill="none"
						stroke={"blue"}
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M4 20c0 0 4-7 12-7 0 0-1.5-6 2-7 0 0 1 4-5 5" />
						<path d="M14 9c1-1 2-2 3-2 1.5 0 2.5 1 2 3s-2 4-4 5-3 1-3 1" />
						<path d="M10 12c0-1-1-2-2-2s-2 .5-2 1.5 1 2 1 2" />
						<path d="M12 4c0 1-1 2-1 3" />
					</svg>

					{/* Title and subtitle */}
					<div className="text-start mb-6">
						{title && (
							<h3 className="text-3xl font-semibold text-gray-800">{title}</h3>
						)}
						{subtitle && (
							<p className="mt-2 text-lg text-gray-400">{subtitle}</p>
						)}
					</div>
				</div>

				{/* Form content */}
				<div className="space-y-4 w-1/2">{children}</div>
			</div>
		</div>
	);
};

export default AuthCard;
