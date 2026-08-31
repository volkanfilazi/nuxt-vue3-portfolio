<script setup lang="ts">
import { VisibilityArea, type MenuItems } from "~/shared/models/terminal";
import Terminal from "~/shared/terminal.vue";

definePageMeta({
  layout: "default",
});

const menuItems: MenuItems[] = [
  // MAIN
  {
    id: "portfolio",
    name: "PORTFOLIO",
    visibilityArea: VisibilityArea.main_terminal,
    authenticatedOnly: false,
  },
  {
    id: "experience",
    name: "EXPERIENCE",
    visibilityArea: VisibilityArea.main_terminal,
    authenticatedOnly: false,
  },
  {
    id: "projects",
    name: "PROJECTS",
    visibilityArea: VisibilityArea.main_terminal,
    authenticatedOnly: false,
  },
  {
    id: "skills",
    name: "SKILLS",
    visibilityArea: VisibilityArea.main_terminal,
    authenticatedOnly: false,
  },

  // PROJECTS
  {
    id: "signflow-visit",
    name: "VISIT",
    visibilityArea: VisibilityArea.projects_terminal,
    authenticatedOnly: false,
  },
  {
    id: "signflow-wormhole",
    name: "WORMHOLE",
    visibilityArea: VisibilityArea.projects_terminal,
    authenticatedOnly: false,
  },
  {
    id: "signflow-wormhole-connect",
    name: "CONNECT",
    visibilityArea: VisibilityArea.wormhole_terminal,
    authenticatedOnly: false,
  },
  {
    id: "signflow-wormhole-cancel",
    name: "CANCEL",
    visibilityArea: VisibilityArea.wormhole_terminal,
    authenticatedOnly: false,
  },
  {
    id: "signflow-wormhole-decode",
    name: "DECODE TOKEN",
    visibilityArea: VisibilityArea.wormhole_terminal,
    authenticatedOnly: true,
  },
  {
    id: "signflow-wormhole-refresh",
    name: "REFRESH TOKEN",
    visibilityArea: VisibilityArea.wormhole_terminal,
    authenticatedOnly: true,
  },
];
</script>

<template class="w-100">
  <div class="w-100">
    <Terminal :menu-items="menuItems"></Terminal>
  </div>
</template>
