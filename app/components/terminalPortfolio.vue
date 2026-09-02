<script setup lang="ts">
import { TERMINAL } from "../constants/terminal";

const technologies = ["ANGULAR", "VUE", "NUXT", "TYPESCRIPT", "C#", ".NET"];
</script>
<template>
  <section class="portfolio">
    <div class="prompt">
      {{ TERMINAL.user }}@{{ TERMINAL.host }}:~/portfolio$
    </div>

    <div class="content">
      <div class="label">// PROFILE</div>

      <h1>VOLKAN FİLAZİ</h1>

      <div class="role">FRONTEND DEVELOPER</div>

      <p>
        I build modern web applications with a focus on clean architecture,
        performance and user experience.
      </p>

      <div class="divider"></div>

      <div class="technologies">
        <div v-for="tech in technologies">
          <div>
            <span class="accent">+</span>
            {{ tech }}
          </div>
        </div>
      </div>
    </div>

    <div class="back">PRESS <span>ESC</span> TO RETURN</div>
  </section>
</template>
<style>
.portfolio {
  color: var(--terminal-text);
}

.content {
  max-width: 700px;
  margin: 55px 0;
}

.label {
  color: var(--terminal-muted);
  font-size: 11px;
  letter-spacing: 1px;
}

h1 {
  margin: 12px 0 0;

  font-size: 48px;
  font-weight: 600;
  letter-spacing: -2px;

  color: var(--terminal-text);
}

.role {
  margin-top: 5px;

  color: var(--terminal-accent);

  font-size: 14px;
  letter-spacing: 2px;
}

p {
  max-width: 600px;

  margin-top: 30px;

  color: var(--terminal-muted);

  font-size: 14px;
  line-height: 1.8;
}

.divider {
  width: 100%;
  height: 1px;

  margin: 35px 0;

  background: var(--terminal-border);
}

.technologies {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 10px;

  color: var(--terminal-muted);

  font-size: 12px;
}

.accent {
  margin-right: 8px;

  color: var(--terminal-accent);
}

.back {
  margin-top: 40px;

  color: var(--terminal-muted);

  font-size: 10px;
  letter-spacing: 1px;
}

.back span {
  color: var(--terminal-accent);
}
</style>
