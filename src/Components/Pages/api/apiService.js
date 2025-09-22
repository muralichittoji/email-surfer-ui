import axiosInstance from "./axiosInstance";

// Check Username/email
export const fetchUsername = async (username) => {
	const response = await axiosInstance.post("/auth/check_user", {
		username_email: username,
	});

	return response.data;
};

// Login and store token
export const loginApi = async (userDetails) => {
	const response = await axiosInstance.post("/auth/login", userDetails);
	console.log({ userDetails });
	// Save token in localStorage

	return response.data;
};

// Fetch all mails for a given user
export const fetchMails = async () => {
	const response = await axiosInstance.get(`/mails`);
	return response.data;
};

// Mark a single mail as read
export const markAsRead = async (mailId) => {
	return axiosInstance.patch(`/mails/${mailId}/read`, { read: true });
};

// Bulk mark as read
export const markAsReadBulk = async (ids) => {
	return axiosInstance.post("/mark_read_bulk", { ids });
};

// Mark mail as favourite
export const toggleFavourite = async (mailId, favourite) => {
	return axiosInstance.patch(`/mails/${mailId}/favourite`, {
		is_favourite: favourite,
	});
};

// report mail as spam

// mark as important

// send mail
export const mailSender = async (mailBody) => {
	return axiosInstance.post(`/mails/send`, mailBody);
};
