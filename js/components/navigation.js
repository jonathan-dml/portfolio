export function initNavigation() {
    const nav = document.querySelector("#site-nav");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const sections = [...document.querySelectorAll("main section[id]")];
    const navMenu = document.querySelector("#nav-menu");

    window.addEventListener(
        "scroll",
        () => {
            nav.classList.toggle("scrolled", window.scrollY > 30);
            const current = sections.reduce(
                (active, section) =>
                    window.scrollY + 180 >= section.offsetTop
                        ? section.id
                        : active,
                "home",
            );
            navLinks.forEach((link) =>
                link.classList.toggle(
                    "active",
                    link.dataset.section === current,
                ),
            );
        },
        { passive: true },
    );

    navLinks.forEach((link) =>
        link.addEventListener("click", () => navMenu.classList.remove("show")),
    );
}
