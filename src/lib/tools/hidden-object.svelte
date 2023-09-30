<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { lightstates } from "$lib/stores";
  let visible = false;
  let x: number = 0;
  let y: number = 0;
  let lightState: boolean = false;
  function visibility() {
    if (lightState) {
      visible = true;

      //   visible = !visible;
    }
  }

  onMount(() => {
    randomXY();
  });

  lightstates.subscribe((value) => {
    lightState = value;
  });

  function randomXY() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    x = Math.random() * (screenHeight - 500);
    y = Math.random() * (screenWidth - 500);
  }
</script>

<div
  class="p-20 absolute"
  transition:fade
  style="top:{x}px; left:{y}px; opacity:1"
>
  {#if visible}
    <div class="absolute top-1/4 left-1/4" transition:fade>
      <slot />
    </div>
  {/if}
  {#if !visible}
    <div
      class="absolute top-0 left-0 z-10 p-20 bg-white/0 blur-3xl rounded-full"
      on:mouseenter={visibility}
    />
  {/if}
</div>
