const ctaBtn = document.getElementById("ctaBtn");
const ctaMessage = document.getElementById("ctaMessage");

if (ctaBtn && ctaMessage) {
	ctaBtn.addEventListener("click", () => {
		const now = new Date();
		const time = now.toLocaleTimeString("es-ES", {
			hour: "2-digit",
			minute: "2-digit",
		});

		ctaMessage.textContent = `¡Gracias por tu interés! (${time})`;
	});
}

const form = document.querySelector(".contact-form");

if (form) {
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		alert("Mensaje enviado. ¡Gracias por contactarnos!");
		form.reset();
	});
}
