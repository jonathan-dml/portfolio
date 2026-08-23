import { initContactForm } from "./components/contact-form.js";
import { initLanguage } from "./components/language.js";
import { initNavigation } from "./components/navigation.js";
import { initProjects } from "./components/projects.js";
import { initRevealAnimations } from "./components/reveal.js";
import { initSkills } from "./components/skills.js";

initNavigation();
initLanguage();
initContactForm();
await initProjects();
await initSkills();
initRevealAnimations();
