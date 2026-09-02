<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();
</script>

<template>
  <div v-if="loading" class="wormhole-loader">
    <div class="wormhole-loader-track">
      <div class="wormhole-loader-bar"></div>
    </div>
  </div>
</template>

<style scoped>
.wormhole-loader {
  width: 100%;
  margin-bottom: 20px;
}

.wormhole-loader-track {
  position: relative;
  width: 100%;
  height: 4px;
  overflow: hidden;
  background: #181c20;
}

.wormhole-loader-bar {
  position: absolute;
  top: 0;
  left: -30%;

  width: 30%;
  height: 100%;

  background: var(--terminal-accent);

  animation: wormhole-loader-animation 1s linear infinite;
}

@keyframes wormhole-loader-animation {
  0% {
    left: -30%;
  }

  100% {
    left: 100%;
  }
}
</style>