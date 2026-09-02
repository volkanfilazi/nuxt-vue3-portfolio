<script setup lang="ts">
import { TERMINAL } from "../constants/terminal";

const skillGroups = [
  {
    title: "FRONTEND",
    level: "PRIMARY",
    items: [
      "Angular 14-21",
      "Vue 3",
      "Nuxt",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "SCSS",
    ],
  },
  {
    title: "BACKEND",
    level: "STRONG",
    items: [
      "C#",
      ".NET Web API",
      "Node.js",
      "Express",
      "REST APIs",
      "MongoDB",
      "SQL",
    ],
  },
  {
    title: "QUALITY",
    level: "PRACTICAL",
    items: [
      "Cypress",
      "Playwright",
      "Unit Testing",
      "Code Reviews",
      "Clean Architecture",
    ],
  },
  {
    title: "DELIVERY",
    level: "WORKFLOW",
    items: [
      "GitHub Actions",
      "GitLab CI",
      "Azure DevOps",
      "Git",
      "Jira",
      "Figma",
    ],
  },
];
</script>

<template>
  <section class="skills">
    <div class="prompt">{{ TERMINAL.user }}@{{ TERMINAL.host }}:~/skills$</div>

    <div class="skills-content">
      <div class="section-label">// TECHNICAL KNOWLEDGE</div>

      <div class="grid">
        <article
          v-for="group in skillGroups"
          :key="group.title"
          class="skill-group"
        >
          <div class="group-header">
            <h1>{{ group.title }}</h1>
            <span>{{ group.level }}</span>
          </div>

          <div class="items">
            <span v-for="item in group.items" :key="item">
              {{ item }}
            </span>
          </div>
        </article>
      </div>

      <div class="summary">
        <span class="accent">SYSTEM NOTE</span>
        Full-stack profile focused on production-ready SaaS, workflow
        automation, secure token-based access, document flows and maintainable
        UI architecture.
      </div>
    </div>

    <div class="hint">PRESS <span>ESC</span> TO RETURN</div>
  </section>
</template>

<style scoped>
.skills {
  color: var(--terminal-text);
}

.skills-content {
  margin-top: 40px;
  max-width: 820px;
}

.section-label {
  margin-bottom: 28px;
  color: var(--terminal-muted);
  font-size: 11px;
  letter-spacing: 1px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.skill-group {
  border-top: 1px solid var(--terminal-border);
  padding-top: 16px;
}

.group-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
}

h1 {
  margin: 0;
  color: var(--terminal-text);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
}

.group-header span {
  color: var(--terminal-accent);
  font-size: 10px;
  letter-spacing: 1px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-top: 14px;
}

.items span {
  color: var(--terminal-muted);
  font-size: 12px;
  line-height: 1.6;
}

.items span::before {
  content: "+";
  margin-right: 6px;
  color: var(--terminal-accent);
}

.summary {
  margin-top: 32px;
  padding-top: 18px;
  border-top: 1px solid var(--terminal-border);
  color: var(--terminal-muted);
  font-size: 13px;
  line-height: 1.8;
}

.accent {
  display: block;
  margin-bottom: 5px;
  color: var(--terminal-accent);
  font-size: 11px;
  letter-spacing: 1px;
}

.hint {
  margin-top: 45px;
  color: var(--terminal-muted);
  font-size: 10px;
  letter-spacing: 1px;
}

.hint span {
  color: var(--terminal-accent);
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
