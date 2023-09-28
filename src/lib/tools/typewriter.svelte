<script lang="ts">
  import { onMount } from "svelte";
  export let speed: number = 1.5;
  export let messages: string[] = [];
  export let time: number = 2500;
  let i: number = 0;

  export function typewriter(
    node: HTMLElement,
    { speed = 1 }
  ): { duration: number; tick: (t: number) => void } {
    const valid =
      node.childNodes.length === 1 &&
      node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
      throw new Error(
        "This transition only works on elements with a single text node child"
      );
    }

    const text = node.textContent || "";
    const duration = text.length / (speed * 0.01);

    return {
      duration,
      tick: (t: number) => {
        const i = Math.trunc(text.length * t);
        node.textContent = text.slice(0, i);
      },
    };
  }

  onMount(() => {
    const interval = setInterval(() => {
      i += 1;
      i %= messages.length;
    }, time);

    return () => {
      clearInterval(interval);
    };
  });
</script>

{#key i}
  <p class="h-5" in:typewriter={{ speed }}>
    {messages[i]}
  </p>
{/key}
