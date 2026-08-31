const skillsUrl = new URL("../data/skills.json", import.meta.url);

function getCurrentLanguage() {
    return document.documentElement.lang || "en";
}

function createSkillCard(skill, index, total) {
    const card = document.createElement("article");
    const delayClass = index % 3 === 1 ? " reveal-delay" : index % 3 === 2 ? " reveal-delay-2" : "";
    card.className = `skill-card reveal${delayClass}`;

    const cardIndex = document.createElement("span");
    cardIndex.className = "card-index";
    cardIndex.textContent = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

    const iconContainer = document.createElement("span");
    iconContainer.className = "skill-icon";
    const icon = document.createElement("i");
    icon.className = `bi ${skill.icon}`;
    iconContainer.append(icon);

    const content = document.createElement("div");
    content.className = "skill-content";

    const kicker = document.createElement("span");
    kicker.className = "skill-kicker";
    kicker.textContent = skill.kicker[getCurrentLanguage()];

    const title = document.createElement("h3");
    title.textContent = skill.title[getCurrentLanguage()];

    const tags = document.createElement("ul");
    tags.className = "skill-tags";
    skill.tags.forEach((tag) => {
        const item = document.createElement("li");
        const tagIcon = document.createElement("i");
        tagIcon.className = tag.icon;
        const tagLabel = document.createElement("span");
        tagLabel.textContent = tag.name;
        item.append(tagIcon, tagLabel);
        tags.append(item);
    });

    content.append(kicker, title, tags);
    card.append(cardIndex, iconContainer, content);
    return card;
}

function updateSkillText(skills) {
    const language = getCurrentLanguage();
    document.querySelectorAll(".skill-card").forEach((card, index) => {
        card.querySelector(".skill-kicker").textContent =
            skills[index].kicker[language];
        card.querySelector("h3").textContent = skills[index].title[language];
    });
}

export async function initSkills() {
    const grid = document.querySelector(".skills-grid");
    const response = await fetch(skillsUrl);
    const skills = await response.json();
    skills.forEach((skill, index) =>
        grid.append(createSkillCard(skill, index, skills.length)),
    );
    document.addEventListener("languagechange", () =>
        updateSkillText(skills),
    );
}
