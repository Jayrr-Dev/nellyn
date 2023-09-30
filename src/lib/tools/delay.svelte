<script lang="ts">
  import { onMount } from "svelte";
  export let duration: number = 1000; // duration in milliseconds

  let showContent = false;

  onMount(() => {
    const timer = setTimeout(() => {
      showContent = true;
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  });
</script>

{#if showContent}
  <slot />
{/if}
