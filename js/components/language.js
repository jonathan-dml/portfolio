import { translations } from "./translations.js";

function setLanguage(language) {
    document.documentElement.lang = language;
    document.querySelector(".language-button span").textContent =
        language.toUpperCase();
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        if (translations[language][element.dataset.i18n])
            element.innerHTML = translations[language][element.dataset.i18n];
    });
    document
        .querySelectorAll(".dropdown-item")
        .forEach((item) =>
            item.classList.toggle("active", item.dataset.lang === language),
        );
    localStorage.setItem("portfolio-language", language);
    document.dispatchEvent(
        new CustomEvent("languagechange", { detail: { language } }),
    );
}

export function initLanguage() {
    document.querySelectorAll("[data-lang]").forEach((button) =>
        button.addEventListener("click", () =>
            setLanguage(button.dataset.lang),
        ),
    );
    setLanguage(localStorage.getItem("portfolio-language") || "en");
}
