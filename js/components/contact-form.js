const emailjsConfig = {
    publicKey: "J7chiJq5ZmN5k72n6",
    serviceId: "service_4w40xjq",
    templateId: "template_nvlnsfp",
};

export function initContactForm() {
    const form = document.querySelector("#contact-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const status = form.querySelector(".form-status");
        const isConfigured = Object.values(emailjsConfig).every(
            (value) => !value.startsWith("YOUR_"),
        );
        status.textContent = "Sending...";

        if (!isConfigured || !window.emailjs) {
            status.textContent =
                "Thanks for reaching out. Add your EmailJS keys in js/main.js to enable delivery.";
            form.reset();
            return;
        }

        try {
            emailjs.init({ publicKey: emailjsConfig.publicKey });
            await emailjs.sendForm(
                emailjsConfig.serviceId,
                emailjsConfig.templateId,
                form,
            );
            status.textContent = "Message sent. Thanks for reaching out!";
            form.reset();
        } catch (error) {
            status.textContent =
                "Something went wrong. Please email me directly at jdmlopes97@gmail.com.";
        }
    });
}
