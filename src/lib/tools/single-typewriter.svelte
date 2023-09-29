<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // Props
  export let speed: number = 1.5;
  export let textToDisplay: string[] = [];
  export let delay: number = 2000;
  export let noloop: boolean = true;

  let currentTextIndex = 0;
  let triggerRender = true; // New flag to force initial render

  onMount(() => {
    function cycleText() {
      // If noloop is true and it's the last text, return
      if (noloop && currentTextIndex === textToDisplay.length - 1) {
        return;
      }

      // Increment the index or reset it
      currentTextIndex = (currentTextIndex + 1) % textToDisplay.length;
      triggerRender = !triggerRender; // Toggle the flag to trigger a re-render

      // Schedule the next cycle
      setTimeout(
        cycleText,
        delay + textToDisplay[currentTextIndex].length * (100 / speed)
      );
    }

    // Initial cycle
    setTimeout(cycleText, delay);
  });

  // Typewriter effect function
  export function typewriter(
    node: HTMLElement,
    { speed = 1 }: { speed: number }
  ): { duration: number; tick: (t: number) => void } {
    const textContent = node.textContent || "";
    const duration = textContent.length / (speed * 0.01);

    return {
      duration,
      tick: (t: number) => {
        const i = Math.trunc(textContent.length * t);
        node.textContent = textContent.slice(0, i);
      },
    };
  }
</script>

{#if textToDisplay.length > 0}
  {#key triggerRender}
    <!-- Use the new flag here -->
    <div
      in:typewriter={{ speed }}
      class="absolute font-thin text-4xl p-30 text-orange-300"
      style="top: 10px;"
    >
      {textToDisplay[currentTextIndex]}
    </div>
  {/key}
{/if}
