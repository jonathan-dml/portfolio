const projectsUrl = new URL("../data/projects.json", import.meta.url);

function createTag({ label, className }) {
    const tag = document.createElement("span");
    tag.className = className;
    tag.textContent = label;
    return tag;
}

function getCurrentLanguage() {
    return document.documentElement.lang || "en";
}

function createProjectCard(project, index) {
    const card = document.createElement("article");
    card.className = `project-card reveal${index % 2 === 1 ? " reveal-delay" : ""}`;

    const imageContainer = document.createElement("div");
    imageContainer.className = `project-image ${project.imageClass}`;
    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.imageAlt;
    imageContainer.append(image);

    const info = document.createElement("div");
    info.className = "project-info";

    const tags = document.createElement("div");
    tags.className = "project-tags";
    project.tags.forEach((tag) => tags.append(createTag(tag)));

    const title = document.createElement("h3");
    title.textContent = project.title[getCurrentLanguage()];

    const description = document.createElement("p");
    description.textContent = project.description[getCurrentLanguage()];

    const actions = document.createElement("div");
    actions.className = "project-actions";
    actions.append(
        createProjectLink(project.codeUrl, "Code", "bi-github", true),
        createProjectLink(project.demoUrl, "Demo", "bi-box-arrow-up-right"),
    );

    info.append(tags, title, description, actions);
    card.append(imageContainer, info);
    return card;
}

function updateProjectText(projects) {
    const language = getCurrentLanguage();
    document.querySelectorAll(".project-card").forEach((card, index) => {
        card.querySelector("h3").textContent = projects[index].title[language];
        card.querySelector(".project-info p").textContent =
            projects[index].description[language];
    });
}

function createProjectLink(url, label, icon, opensNewTab = true) {
    const link = document.createElement("a");
    link.className = `project-button ${
        label === "Code" ? "project-button-dark" : "project-button-blue"
    }`;
    link.href = url;
    if (opensNewTab) {
        link.target = "_blank";
        link.rel = "noreferrer";
    }
    if (label === "Demo") link.dataset.demoLink = "";
    link.append(document.createTextNode(`${label} `));

    const iconElement = document.createElement("i");
    iconElement.className = `bi ${icon}`;
    link.append(iconElement);
    return link;
}

export async function initProjects() {
    const grid = document.querySelector(".projects-grid");
    const response = await fetch(projectsUrl);
    const projects = await response.json();
    projects.forEach((project, index) =>
        grid.append(createProjectCard(project, index)),
    );
    document.addEventListener("languagechange", () =>
        updateProjectText(projects),
    );
}
