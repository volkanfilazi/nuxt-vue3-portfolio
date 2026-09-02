<script setup lang="ts">
import { TERMINAL } from "../constants/terminal";

const experiences = [
  {
    role: "FULL-STACK DEVELOPER",
    company: "LOIDL CONSULTING & IT SERVICES GMBH",
    mode: "ON-SITE / FULL-TIME",
    period: "JAN 2024 - MAR 2026",
    stack: ["Angular 14-18", "TypeScript", "C#/.NET", "MongoDB", "Cypress"],
    points: [
      "Built and maintained modular HealthTech platform features for care and support workflows in Austria.",
      "Designed Angular frontend modules and C#/.NET REST APIs inside a microservice-based architecture.",
      "Worked on permissions, document workflows, medication management, audit tracking and CI/CD pipelines.",
    ],
  },
  {
    role: "FULL-STACK DEVELOPER",
    company: "WIRHELFEN.EU",
    mode: "REMOTE / FULL-TIME",
    period: "JUL 2023 - JAN 2024",
    stack: ["Angular", "Ionic", "Capacitor", "Node.js", "Express", "MongoDB"],
    points: [
      "Developed a mobile assistance platform with authentication, map integration, donation flow and chat features.",
      "Collaborated closely with UI/UX design in Figma while owning frontend and backend implementation work.",
    ],
  },
  {
    role: "PRODUCT BUILDER",
    company: "SIGNFLOW",
    mode: "LIVE SAAS PRODUCT",
    period: "CURRENT",
    stack: ["Angular 21", "C#/.NET Web API", "MongoDB", "JWT", "REST APIs"],
    points: [
      "Architected a workflow automation platform for approvals, client data collection and e-signatures.",
      "Implemented secure external access with expiring tokens, submission tracking, audit logs and PDF generation.",
    ],
  },
];
</script>

<template>
  <section class="experience">
    <div class="prompt">
      {{ TERMINAL.user }}@{{ TERMINAL.host }}:~/experience$
    </div>

    <div class="experience-content">
      <div class="section-label">// PROFESSIONAL EXPERIENCE</div>

      <div class="timeline">
        <article
          v-for="item in experiences"
          :key="`${item.company}-${item.period}`"
          class="experience-item"
        >
          <div class="meta">
            <span>{{ item.period }}</span>
            <span>{{ item.mode }}</span>
          </div>

          <h1>{{ item.role }}</h1>

          <div class="company">
            {{ item.company }}
          </div>

          <ul>
            <li v-for="point in item.points" :key="point">
              {{ point }}
            </li>
          </ul>

          <div class="stack">
            <span v-for="tech in item.stack" :key="tech">
              {{ tech }}
            </span>
          </div>
        </article>
      </div>
    </div>

    <div class="hint">PRESS <span>ESC</span> TO RETURN</div>
  </section>
</template>

<style scoped>
.experience {
  color: var(--terminal-text);
}

.experience-content {
  margin-top: 40px;
  max-width: 820px;
}

.section-label {
  margin-bottom: 28px;
  color: var(--terminal-muted);
  font-size: 11px;
  letter-spacing: 1px;
}

.timeline {
  display: grid;
  gap: 28px;
}

.experience-item {
  padding-left: 18px;
  border-left: 1px solid var(--terminal-border);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  color: var(--terminal-muted);
  font-size: 10px;
  letter-spacing: 0.8px;
}

h1 {
  margin: 8px 0 0;
  color: var(--terminal-text);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
}

.company {
  margin-top: 2px;
  color: var(--terminal-accent);
  font-size: 12px;
  letter-spacing: 1.2px;
}

ul {
  margin: 16px 0 0;
  padding-left: 0;
  list-style: none;
}

li {
  position: relative;
  margin-top: 8px;
  padding-left: 18px;
  color: var(--terminal-muted);
  font-size: 13px;
  line-height: 1.7;
}

li::before {
  content: ">";
  position: absolute;
  left: 0;
  color: var(--terminal-accent);
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 16px;
}

.stack span {
  color: var(--terminal-muted);
  font-size: 11px;
}

.stack span::before {
  content: "+";
  margin-right: 6px;
  color: var(--terminal-accent);
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
</style>
