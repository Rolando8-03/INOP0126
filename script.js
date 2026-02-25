const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const linkItems = navLinks ? Array.from(navLinks.querySelectorAll("a")) : [];

if (navToggle && navLinks) {
	navToggle.addEventListener("click", () => {
		const isOpen = navLinks.classList.toggle("is-open");
		navToggle.setAttribute("aria-expanded", String(isOpen));
	});
}

linkItems.forEach((link) => {
	link.addEventListener("click", (event) => {
		const href = link.getAttribute("href");
		if (!href || !href.startsWith("#")) {
			return;
		}
		event.preventDefault();
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
		if (navLinks) {
			navLinks.classList.remove("is-open");
			if (navToggle) {
				navToggle.setAttribute("aria-expanded", "false");
			}
		}
	});
});

// Fade-in animations on scroll.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
	const revealObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					revealObserver.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.2 }
	);

	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Highlight the active section in the menu.
const sectionElements = Array.from(document.querySelectorAll("main section[id]"));

if ("IntersectionObserver" in window && linkItems.length) {
	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}
				const currentId = entry.target.getAttribute("id");
				linkItems.forEach((link) => {
					const linkTarget = link.getAttribute("href");
					link.classList.toggle(
						"active",
						linkTarget === `#${currentId}`
					);
				});
			});
		},
		{ rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
	);

	sectionElements.forEach((section) => sectionObserver.observe(section));
}
