<script lang="ts">
  import { onMount } from "svelte";
  import { Sound } from "svelte-sound";
  import { fade } from "svelte/transition";
  // Declare and initialize the color variables
  export let stringColor: string = "#597B91";
  let ballonColor: string = "#FF473E";
  export let highlightColor: string = "#ffffff";
  export let width: string = "100";
  export let height: string = "100";
  import { poppedBalloonCount } from "$lib/stores";

  import ripping from "$lib/sounds/ripping.mp3";
  let isPopped: boolean = false;
  let delayOver: boolean = false;
  export let delay: number = 5000;
  // Create a sound effect
  const click_sound = new Sound(ripping, { volume: 1 });

  function playSound() {
    click_sound.play();
  }

  // Declare x and y variables to store mouse position
  let x: number = 0;
  let y: number = 0;

  // Declare svgX and svgY variables to store the SVG position
  let svgX: number = 0;
  let svgY: number = 0;

  let balloonTop: number = 0;
  let balloonLeft: number = 0;

  //custom delay
  setTimeout(() => {
    delayOver = true;
  }, delay);

  // Function to generate random position for the balloon
  function setRandomBalloonPosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // balloonTop = 0.5 * (screenHeight - 100);
    // balloonLeft = 0.3 * (screenWidth - 100);

    balloonTop = Math.random() * (screenHeight - 400); // Subtracting 100 to make sure the entire balloon fits in the screen
    balloonLeft = Math.random() * (screenWidth - 400); // Subtracting 100 to make sure the entire balloon fits in the screen
  }

  // Function to get the mouse position
  function getMousePosition(event: MouseEvent) {
    x = event.pageX;
    y = event.pageY;
  }

  function popBalloon(event: MouseEvent) {
    isPopped = true;
    // Get coordinates from the event and directly set them.
    svgX = event.clientX;
    svgY = event.clientY;

    // Increment the count in the store
  }
  // Function to set the SVG position based on mouse coordinates
  function setSVGPosition() {
    svgX = x;
    svgY = y;
  }

  // Add event listener to get the mouse position
  onMount(() => {
    window.addEventListener("mousemove", getMousePosition);
    // window.addEventListener("click", setSVGPosition);
    // Change the balloon color when the component is created
    ballonColor = getRandomColor();
    setRandomBalloonPosition();
    // Function for linear interpolation
    function lerp(start: number, end: number, t: number): number {
      return start * (1 - t) + end * t;
    }

    function randomMovements() {
      let time = Math.random() * 10; // Random initial time
      let frequencyX = Math.random() * 0.2 + 0.8; // Random frequency for X
      let frequencyY = Math.random() * 0.2 + 0.8; // Random frequency for Y
      let currentX = balloonLeft;
      let currentY = balloonTop;
      let targetX = balloonLeft;
      let targetY = balloonTop;

      // Animation function
      const animate = () => {
        time += 0.001; // Decreased time increment for slower animation

        // Update target position based on some function (e.g., sine and cosine)
        targetX =
          balloonLeft +
          Math.cos(time * frequencyX) * 50 +
          Math.sin(time * 0.9) * 25;
        targetY =
          balloonTop +
          Math.cos(time * frequencyY) * 50 +
          Math.cos(time * 1.1) * 25;

        // Smoothly interpolate between the current and target positions
        currentX = lerp(currentX, targetX, 0.01); // Smaller smoothing factor for smoother animation
        currentY = lerp(currentY, targetY, 0.01);

        // Apply the new interpolated position
        balloonLeft = currentX;
        balloonTop = currentY;

        // Request the next animation frame
        requestAnimationFrame(animate);
      };

      // Start the animation
      animate();
    }
    setTimeout(() => {
      // randomMovements();
    }, 2000);
  });

  // Array of colors to choose from
  const colors = [
    "rgba(255, 0, 0, 0.5)",
    "rgba(0, 255, 0, 0.5)",
    "rgba(0, 0, 255, 0.5)",
    "rgba(255, 255, 0, 0.5)",
    "rgba(0, 255, 255, 0.5)",
    "rgba(255, 0, 255, 0.5)",
    "rgba(255, 87, 51, 0.5)",
  ];

  // Function to get a random color from the array
  function getRandomColor(): string {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  $: if (isPopped) {
    setSVGPosition();
    playSound();
  }
</script>

{#if !isPopped}
  {#if delayOver}
    <div
      class="absolute z-20 animate-move-up-to-spot"
      style={`top: ${balloonTop}px; left: ${balloonLeft}px;`}
    >
      <button
        on:mouseup={(event) => popBalloon(event)}
        on:mouseup={popBalloon}
        on:click={playSound}
        class="z-10 rounded-full animate-wiggle animate-infinite animate-duration-[3000ms]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="312"
          height="312"
          viewBox="0 0 512 512"
          ><path
            fill="#FF473E"
            d="M472.469 389.156L273.237 499.735c-9.558 5.305-25.198 5.305-34.755 0L39.249 389.156c-4.779-2.652-7.168-6.149-7.168-9.645h-2.116V132.489h449.673v247.022c0 3.496-2.389 6.993-7.169 9.645z"
          /><path
            fill="#FF6E83"
            d="M479.638 132.489v247.022c0 3.497-2.389 6.993-7.168 9.646L273.237 499.735c-4.97 2.758-11.583 4.072-18.132 3.959c.155-123.695 3.671-247.546-.173-371.206h224.706z"
          /><path
            fill="#FFA9BA"
            d="M238.481 252.712L39.249 142.133c-9.558-5.305-9.558-13.985 0-19.29L238.481 12.265c9.558-5.305 25.198-5.305 34.755 0l199.233 110.579c9.558 5.305 9.558 13.985 0 19.29L273.237 252.712c-9.558 5.305-25.198 5.305-34.756 0z"
          /><path
            fill="#FFD4DE"
            d="M391.09 74.124a6.502 6.502 0 0 1-3.442 5.681L148.934 207.05a6.445 6.445 0 0 1-1.026.438l-.807.451v237.47a6.5 6.5 0 0 1-9.654 5.684l-40-22.201a6.5 6.5 0 0 1-3.346-5.684V192.123a26.49 26.49 0 0 1 9.913-20.655l.236-.184c.524-.41 1.021-.771 1.532-1.116a27.095 27.095 0 0 1 2.352-1.428l231.74-123.528a6.498 6.498 0 0 1 6.212.053l41.659 23.121a6.502 6.502 0 0 1 3.345 5.738zm22.013 100.531a26.438 26.438 0 0 0-5.148-4.523c-.125-.085-.25-.17-.397-.266a26.054 26.054 0 0 0-1.905-1.129L173.914 45.211a6.495 6.495 0 0 0-6.212.053l-41.659 23.121a6.499 6.499 0 0 0 .097 11.42L364.854 207.05c.332.177.676.323 1.027.439l.806.451v237.47a6.5 6.5 0 0 0 9.654 5.684l40-22.201a6.503 6.503 0 0 0 3.346-5.684V192.123a26.498 26.498 0 0 0-6.584-17.468z"
          /><path
            fill="#FF6E83"
            d="M335.602 137.083c0 16.311-20.006 28.149-47.569 28.149c-11.241 0-21.222-1.971-29.104-5.409a7.462 7.462 0 0 0-6.345.189c-8.215 4.146-19.108 6.562-31.548 6.562c-27.563 0-47.569-11.838-47.569-28.149c0-8.212 5.072-15.289 13.626-20.294c3.37-1.971 4.785-6.178 3.116-9.707c-6.097-12.894-5.901-24.991 1.577-32.469c3.873-3.873 9.177-5.92 15.34-5.92c4.33 0 9.032 1.023 13.863 2.944a7.61 7.61 0 0 0 9.844-4.142c4.965-11.851 13.18-19.15 23.03-19.15c9.682 0 17.787 7.051 22.776 18.547c1.656 3.816 6.027 5.637 9.872 4.05c5.048-2.083 9.966-3.197 14.482-3.197c7.785 0 12.639 3.219 15.34 5.92c7.351 7.351 7.667 19.164 1.885 31.811c-1.622 3.548-.184 7.746 3.212 9.665c8.882 5.018 14.172 12.217 14.172 20.6z"
          /></svg
        >
      </button>
    </div>
  {/if}
{:else}
  <button
    class="absolute w-0 h-0"
    style={`top: ${svgY - 15}px; left: ${svgX - 15}px;`}
  >
    <slot />
  </button>
{/if}
