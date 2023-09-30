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
  const click_sound = new Sound(ripping, { volume: 0.5 });

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
          {width}
          {height}
          out:fade
          viewBox="0 0 24 24"
          ><g fill="#964b00"
            ><path
              d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073a3.196 3.196 0 0 0-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709l2 1.05Z"
            /><path
              d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641Z"
              opacity=".7"
            /><path
              d="M21.403 7.14a3.153 3.153 0 0 0-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802Z"
              opacity=".5"
            /><path
              d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011c.137.155.257.32.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3.062 3.062 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824a3.15 3.15 0 0 1 .362-.498l9.04 4.52l3.386-1.693l-9.063-4.985Z"
            /></g
          ></svg
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
