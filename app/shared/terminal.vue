<script setup lang="ts">
import { status, TERMINAL } from "./constants/terminal.ts";
import {
  VisibilityArea,
  type MenuItems,
} from "./models/terminal";
import { useTerminalScroll } from "./composables/useTerminalScroll";
import { useWormholeAuth } from "./composables/useWormholeAuth";

import TerminalLoader from "./terminalLoader.vue";
import TerminalExperience from "./terminalExperience.vue";
import TerminalPortfolio from "./terminalPortfolio.vue";
import TerminalProjects from "./terminalProjects.vue";
import TerminalSkills from "./terminalSkills.vue";
import TerminalWormHole from "./terminalWormHole.vue";

const selectedIndex = ref(0);
const {
  terminalBodyRef,
  scrollTerminalBy,
  scrollTerminalToBottom,
} = useTerminalScroll();

const wormholeRef = ref<InstanceType<typeof TerminalWormHole> | null>(null);

const wormholeFocusIndex = ref(0);
const wormholeActionFocusIndex = 2;

const wormholeEmail = ref("");
const wormholePassword = ref("");

const {
  isAuthenticated,
  isConnecting,
  wormholeLogs,
  decodeTokenLogs,
  connectToSignFlow,
  decodeToken,
  refreshToken,
  clearAuthInfos,
} = useWormholeAuth({
  email: wormholeEmail,
  password: wormholePassword,
  onOutput: scrollTerminalToBottom,
});

const currentArea = ref<VisibilityArea>(VisibilityArea.main_terminal);

const props = defineProps<{
  menuItems: MenuItems[];
}>();

const visibleMenuItems = computed(() => {
  return props.menuItems.filter((item) => {
    if (item.visibilityArea !== currentArea.value) {
      return false;
    }

    if (isAuthenticated.value) {
      return (
        item.id !== "signflow-wormhole-connect" &&
        item.id !== "signflow-wormhole-cancel"
      );
    }

    return (
      item.id !== "signflow-wormhole-decode" &&
      item.id !== "signflow-wormhole-refresh"
    );
  });
});

const selectedMenuItem = computed(() => {
  return visibleMenuItems.value[selectedIndex.value];
});

const isMenuSelectionVisible = computed(() => {
  if (
    currentArea.value !== VisibilityArea.wormhole_terminal ||
    isAuthenticated.value
  ) {
    return true;
  }

  return wormholeFocusIndex.value === wormholeActionFocusIndex;
});

function selectMenuItem(index: number) {
  selectedIndex.value = index;

  if (
    currentArea.value === VisibilityArea.wormhole_terminal &&
    !isAuthenticated.value
  ) {
    wormholeFocusIndex.value = wormholeActionFocusIndex;
    wormholeRef.value?.blurInputs();
  }
}

async function activateMenuItem(index: number) {
  selectMenuItem(index);
  await handleEnter();
}

function moveUp() {
  if (
    currentArea.value === VisibilityArea.wormhole_terminal &&
    !isAuthenticated.value
  ) {
    if (wormholeFocusIndex.value === wormholeActionFocusIndex) {
      if (selectedIndex.value > 0) {
        selectedIndex.value--;

        return true;
      }

      wormholeFocusIndex.value = 1;

      wormholeRef.value?.focusInput(1);

      return true;
    }

    if (wormholeFocusIndex.value > 0) {
      wormholeFocusIndex.value--;

      wormholeRef.value?.focusInput(wormholeFocusIndex.value);

      return true;
    }
    return false;
  }

  if (visibleMenuItems.value.length === 0) {
    return false;
  }

  if (selectedIndex.value === 0) {
    return false;
  }

  selectedIndex.value--;

  return true;
}

function moveDown() {
  if (
    currentArea.value === VisibilityArea.wormhole_terminal &&
    !isAuthenticated.value
  ) {
    if (wormholeFocusIndex.value === wormholeActionFocusIndex) {
      if (selectedIndex.value >= visibleMenuItems.value.length - 1) {
        return false;
      }

      selectedIndex.value = Math.min(
        visibleMenuItems.value.length - 1,
        selectedIndex.value + 1,
      );

      return true;
    }

    if (wormholeFocusIndex.value < 1) {
      wormholeFocusIndex.value++;

      wormholeRef.value?.focusInput(wormholeFocusIndex.value);

      return true;
    }

    wormholeFocusIndex.value = wormholeActionFocusIndex;

    selectedIndex.value = 0;

    wormholeRef.value?.blurInputs();

    return true;
  }

  if (visibleMenuItems.value.length === 0) {
    return false;
  }

  if (selectedIndex.value >= visibleMenuItems.value.length - 1) {
    return false;
  }

  selectedIndex.value++;

  return true;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowUp") {
    event.preventDefault();

    if (!moveUp()) {
      scrollTerminalBy(-1);
    }

    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();

    if (!moveDown()) {
      scrollTerminalBy(1);
    }

    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();

    handleEnter();

    return;
  }

  if (event.key === "Escape") {
    handleEscape();
  }
}

async function handleEnter() {
  if (
    currentArea.value === VisibilityArea.wormhole_terminal &&
    !isAuthenticated.value &&
    wormholeFocusIndex.value !== wormholeActionFocusIndex
  ) {
    if (wormholeFocusIndex.value === 0) {
      wormholeFocusIndex.value = 1;

      wormholeRef.value?.focusInput(1);

      return;
    }

    if (wormholeFocusIndex.value === 1) {
      await connectToSignFlow();

      return;
    }
  }

  const item = selectedMenuItem.value;

  if (!item) {
    return;
  }

  switch (item.id) {
    case "portfolio":
      currentArea.value = VisibilityArea.portfolio_terminal;

      selectedIndex.value = 0;

      break;

    case "experience":
      currentArea.value = VisibilityArea.experience_terminal;

      selectedIndex.value = 0;

      break;

    case "projects":
      currentArea.value = VisibilityArea.projects_terminal;

      selectedIndex.value = 0;

      break;

    case "skills":
      currentArea.value = VisibilityArea.skills_terminal;

      selectedIndex.value = 0;

      break;

    case "contact":
      return;

    case "signflow-visit":
      window.open(
        "https://usesignflow.com",
        "_blank",
        "noopener,noreferrer",
      );

      break;

    case "signflow-wormhole":
      currentArea.value = VisibilityArea.wormhole_terminal;

      selectedIndex.value = 0;

      wormholeFocusIndex.value = 0;

      await nextTick();

      wormholeRef.value?.focusInput(0);

      break;

    case "signflow-wormhole-connect":
      await connectToSignFlow();

      break;

    case "signflow-wormhole-cancel":
      currentArea.value = VisibilityArea.projects_terminal;

      clearAuthInfos();

      selectedIndex.value = 0;

      wormholeFocusIndex.value = 0;

      break;

    case "signflow-wormhole-decode":
      decodeToken();

      break;

    case "signflow-wormhole-refresh":
      await refreshToken();

      break;

    default:
      console.log("Selected:", item.id);
  }
}

function handleEscape() {
  switch (currentArea.value) {
    case VisibilityArea.main_terminal:
      return;

    case VisibilityArea.projects_terminal:

    case VisibilityArea.portfolio_terminal:

    case VisibilityArea.experience_terminal:

    case VisibilityArea.skills_terminal:

    case VisibilityArea.contact_terminal:
      currentArea.value = VisibilityArea.main_terminal;

      selectedIndex.value = 0;

      break;

    case VisibilityArea.wormhole_terminal:
      currentArea.value = VisibilityArea.projects_terminal;

      clearAuthInfos();

      selectedIndex.value = 0;

      break;

    default:
      currentArea.value = VisibilityArea.main_terminal;

      selectedIndex.value = 0;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    class="vh-100 d-flex flex-column align-items-center justify-content-center"
  >
    <div class="terminal">
      <div class="terminal-header">
        <div class="window-controls">
          <span class="bg-danger"></span>
          <span class="bg-primary"></span>
          <span class="bg-warning"></span>
        </div>

        <div class="terminal-title">SYSTEM TERMINAL</div>

        <div class="terminal-version">v1.0.4</div>
      </div>

      <div ref="terminalBodyRef" class="terminal-body">
        <TerminalLoader :loading="isConnecting" />

        <div v-if="currentArea === VisibilityArea.main_terminal" class="boot">
          <div class="prompt">
            {{ TERMINAL.user }}@{{ TERMINAL.host }}:~$ ./initialize
          </div>

          <div class="system-message">&gt; INITIALIZING SYSTEM...</div>

          <div class="status">
            <div v-for="value in status" :key="value">
              <div class="d-flex flex-row gap-1">
                <span>
                  {{ value }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <TerminalPortfolio
          v-else-if="currentArea === VisibilityArea.portfolio_terminal"
        />

        <TerminalExperience
          v-else-if="currentArea === VisibilityArea.experience_terminal"
        />

        <TerminalProjects
          v-else-if="currentArea === VisibilityArea.projects_terminal"
        />

        <TerminalSkills
          v-else-if="currentArea === VisibilityArea.skills_terminal"
        />

        <div v-else-if="currentArea === VisibilityArea.contact_terminal">
          <div class="prompt">
            {{ TERMINAL.user }}@{{ TERMINAL.host }}:~/contact$
          </div>
          <div>CONTACT</div>
        </div>

        <div v-else-if="currentArea === VisibilityArea.wormhole_terminal">
          <div class="prompt">
            {{ TERMINAL.user }}@{{ TERMINAL.host }}:~/wormhole$
          </div>

          <TerminalWormHole
            ref="wormholeRef"
            v-model:email="wormholeEmail"
            v-model:password="wormholePassword"
            :wormholeLogs="wormholeLogs"
            :isAuthenticated="isAuthenticated"
            :decodeTokenLogs="decodeTokenLogs"
            :focusIndex="wormholeFocusIndex"
          />
        </div>

        <div class="terminal-navigation">
          <div class="prompt">{{ TERMINAL.user }}@{{ TERMINAL.host }}:~$</div>

          <nav class="terminal-menu">
            <div v-for="(item, index) in visibleMenuItems" :key="item.id">
              <button
                type="button"
                class="menu-item"
                :class="{
                  active: index === selectedIndex && isMenuSelectionVisible,
                }"
                @mouseenter="selectMenuItem(index)"
                @focus="selectMenuItem(index)"
                @click="activateMenuItem(index)"
              >
                <span class="arrow"> &gt; </span>

                {{ item.name }}
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div class="terminal-footer">
        <span> ↑ ↓ NAVIGATE </span>

        <span> ENTER SELECT </span>

        <span> ESC BACK </span>

        <span> ONLINE ● </span>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --terminal-bg: #080a0c;
  --terminal-panel: #0d1013;
  --terminal-border: #252a2f;
  --terminal-text: #d7dce0;
  --terminal-muted: #6d747b;
  --terminal-accent: #8cffb0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #050607;
  color: var(--terminal-text);

  font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
}

.terminal {
  width: min(1100px, 92vw);
  height: min(700px, 85vh);

  display: flex;
  flex-direction: column;

  background: var(--terminal-panel);

  border: 1px solid var(--terminal-border);
  border-radius: 8px;

  overflow: hidden;

  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.02),
    0 25px 80px rgba(0, 0, 0, 0.6);
}

.terminal-header {
  height: 48px;

  display: flex;
  align-items: center;

  padding: 0 18px;

  border-bottom: 1px solid var(--terminal-border);

  background: #0a0d0f;
}

.window-controls {
  display: flex;
  gap: 7px;

  width: 120px;
}

.window-controls span {
  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: #343a40;
}

.terminal-title {
  flex: 1;

  text-align: center;

  color: var(--terminal-muted);

  font-size: 12px;
  letter-spacing: 1px;
}

.terminal-version {
  width: 120px;

  text-align: right;

  color: var(--terminal-muted);

  font-size: 11px;
}

.terminal-body {
  flex: 1;

  padding: 35px 45px;

  overflow-y: auto;

  font-size: 14px;
  line-height: 1.8;
}

.prompt {
  color: var(--terminal-accent);
}

.system-message {
  margin-top: 18px;

  color: var(--terminal-text);
}

.status {
  margin-bottom: 45px;

  color: var(--terminal-muted);
}

.terminal-navigation {
  margin-top: 30px;
}

.terminal-menu {
  margin-top: 15px;
}

.menu-item {
  width: fit-content;

  padding: 2px 12px;
  border: 0;
  outline: none;
  display: block;

  background: transparent;
  color: var(--terminal-muted);
  font: inherit;
  text-align: left;

  cursor: pointer;

  transition:
    color 120ms ease,
    background 120ms ease;
}

.menu-item .arrow {
  display: inline-block;

  width: 20px;

  opacity: 0;
}

.menu-item.active {
  color: var(--terminal-accent);

  background: rgba(140, 255, 176, 0.04);
}

.menu-item:hover {
  color: var(--terminal-accent);
}

.menu-item.active .arrow {
  opacity: 1;

  animation: cursor-blink 1s infinite;
}

.terminal-footer {
  display: flex;

  justify-content: space-between;

  padding: 12px 18px;

  border-top: 1px solid var(--terminal-border);

  color: var(--terminal-muted);

  font-size: 10px;
  letter-spacing: 0.5px;
}

.terminal-footer span:last-child {
  color: var(--terminal-accent);
}

@keyframes cursor-blink {
  50% {
    opacity: 0;
  }
}
</style>
