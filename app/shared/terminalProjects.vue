<script setup lang="ts">
const highlights = [
  "Multi-step workflow builder for collecting client data, approvals and signatures.",
  "Protected external access with expiring tokens and submission lifecycle tracking.",
  "Audit trail, branded PDF generation and notification flow around completed documents.",
];

const technologies = [
  "Angular 21",
  "C#",
  ".NET Web API",
  "MongoDB",
  "JWT",
  "MailKit",
];
</script>

<template>
  <section class="projects">
    <div class="prompt">VOLKAN@PORTFOLIO:~/projects$</div>
    <div class="projects-content">
      <div class="section-label">// PROJECTS</div>
      <div class="project">
        <div class="meta">
          LIVE SAAS PRODUCT
        </div>

        <h1>SIGNFLOW</h1>

        <p class="description">
          Workflow automation platform for forms, approvals and e-signatures.
          The portfolio wormhole connects to its auth flow as a small live demo.
        </p>

        <div class="project-output">
          <div
            v-for="item in highlights"
            :key="item"
            class="output-line"
          >
            <span>&gt;</span>
            {{ item }}
          </div>
        </div>

        <div class="technologies">
          <span
            v-for="tech in technologies"
            :key="tech"
          >
            {{ tech }}
          </span>
        </div>
        <div class="actions"></div>
      </div>
    </div>
    <div class="hint">
      ↑ ↓ NAVIGATE &nbsp;&nbsp; ENTER SELECT &nbsp;&nbsp; ESC BACK
    </div>
  </section>
</template>

<style scoped>
.projects {
  color: var(--terminal-text);
}

.projects-content {
  margin-top: 45px;
}

.section-label {
  margin-bottom: 35px;

  color: var(--terminal-muted);

  font-size: 11px;
  letter-spacing: 1px;
}

.project {
  max-width: 780px;
}

.meta {
  margin-bottom: 8px;
  color: var(--terminal-accent);
  font-size: 11px;
  letter-spacing: 1px;
}

.project h1 {
  margin: 0;

  font-size: 42px;
  font-weight: 600;
  letter-spacing: -2px;
}

.description {
  margin-top: 10px;
  max-width: 690px;

  color: var(--terminal-muted);

  font-size: 13px;
  line-height: 1.8;
}

.project-output {
  display: grid;
  gap: 8px;

  margin-top: 28px;
}

.output-line {
  color: var(--terminal-muted);
  font-size: 13px;
  line-height: 1.7;
}

.output-line span {
  margin-right: 8px;
  color: var(--terminal-accent);
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;

  margin-top: 25px;
}

.technologies span {
  color: var(--terminal-muted);

  font-size: 11px;
}

.technologies span:not(:last-child)::after {
  content: " ·";

  margin-left: 8px;
}

.actions {
  display: flex;
  gap: 30px;

  margin-top: 40px;
}

.action {
  padding: 3px 10px;

  color: var(--terminal-muted);

  cursor: pointer;
}

.action .arrow {
  display: inline-block;

  width: 18px;

  opacity: 0;
}

.action.active {
  color: var(--terminal-accent);

  background: rgba(140, 255, 176, 0.04);
}

.action.active .arrow {
  opacity: 1;

  animation: cursor-blink 1s infinite;
}

.hint {
  margin-top: 60px;

  color: var(--terminal-muted);

  font-size: 10px;
  letter-spacing: 0.5px;
}

@keyframes cursor-blink {
  50% {
    opacity: 0;
  }
}
</style>
