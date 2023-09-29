<!-- FloatingBalloon.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  /**
   * @type {HTMLDivElement}
   */
  let balloon: HTMLDivElement;

  onMount(() => {
    let time = 0;
    let x = window.innerWidth;
    let y = window.innerHeight;

    const animate = () => {
      // Increment the time variable to make the motion proceed
      time += 0.01;

      // Circular motions with varying radii and speed (controlled by sine/cosine multipliers)
      x =
        window.innerWidth / 2 +
        Math.sin(time) * 100 +
        Math.sin(time * 0.9) * 50;
      y =
        window.innerHeight / 2 +
        Math.cos(time) * 100 +
        Math.cos(time * 1.1) * 50;

      // Apply the new position
      balloon.style.transform = `translate(${x}px, ${y}px)`;

      // Recur for the next frame
      requestAnimationFrame(animate);
    };

    // Start the animation
    animate();
  });
</script>

<div class="p-10" bind:this={balloon}>
  <slot />
</div>

<!-- Add your balloon styling -->
