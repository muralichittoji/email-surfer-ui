(function () {
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const html = document.documentElement;

	if (prefersDark) {
		html.classList.add("dark");
	} else {
		html.classList.remove("dark");
	}
})();
