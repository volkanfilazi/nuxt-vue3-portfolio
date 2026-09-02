import { nextTick, ref, type Ref } from "vue";

export function useTerminalScroll(): {
  terminalBodyRef: Ref<HTMLElement | null>;
  scrollTerminalBy: (direction: -1 | 1) => void;
  scrollTerminalToBottom: () => Promise<void>;
} {
  const terminalBodyRef = ref<HTMLElement | null>(null);

  async function scrollTerminalToBottom() {
    await nextTick();

    window.requestAnimationFrame(() => {
      const terminalBody = terminalBodyRef.value;

      if (!terminalBody) {
        return;
      }

      terminalBody.scrollTo({
        top: terminalBody.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  function scrollTerminalBy(direction: -1 | 1) {
    const terminalBody = terminalBodyRef.value;

    if (!terminalBody) {
      return;
    }

    terminalBody.scrollBy({
      top: direction * Math.round(terminalBody.clientHeight * 0.45),
      behavior: "smooth",
    });
  }

  return {
    terminalBodyRef,
    scrollTerminalBy,
    scrollTerminalToBottom,
  };
}
