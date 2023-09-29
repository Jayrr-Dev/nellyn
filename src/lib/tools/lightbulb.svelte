<script lang="ts">
  import { onMount, beforeUpdate } from "svelte";
  // Reactive variables to hold the colors
  let glass = "#c0c0c0";
  let circleColor = "#ffffff";
  let filament = "#000000";
  let bottomRectColor = "#99AAB5";
  let linesColor = "#CCD6DD";
  let xAdjust = 0;
  let yAdjust = 0;

  export let mouseFollow: boolean = true;
  export let changeColor: boolean = false;
  export let lightState: boolean = false;
  export let constantlyChangeColor: boolean = false;
  export let yPosition: number = xAdjust;
  export let xPosition: number = yAdjust;
  // Color palette for random colors
  const randomColor = ["#003049", "#d62828", "#f77f00", "#fcbf49", "#eae2b7"];
  beforeUpdate(() => {
    // Add event listener to get the mouse position
    if (lightState) {
      xAdjust = window.innerWidth / 2;
      yAdjust = window.innerHeight / 2 - 30;
      window.addEventListener("click", handleMouseMove);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleMouseMove);
    } else {
      window.removeEventListener("click", handleMouseMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
    }
  });
  // Function to change the glass color to a random color from the palette
  function changeGlassColor() {
    const randomIndex = Math.floor(Math.random() * randomColor.length);
    glass = randomColor[randomIndex];
  }

  // Function to toggle the light on and off

  function lightToggle() {
    lightState = !lightState;
    if (!lightState) {
      glass = "#c0c0c0";
      circleColor = "#ffffff";
      filament = "#000000";
      bottomRectColor = "#99AAB5";
      linesColor = "#CCD6DD";
    } else {
      glass = "#ffd700";
      circleColor = "#ffffff";
      filament = "#000000";
      bottomRectColor = "#99AAB5";
      linesColor = "#CCD6DD";
    }
  }

  // Variables to hold the mouse x and y positions
  let x = yPosition;
  let y = xPosition - 400;

  // Function to update x and y on mousemove
  function handleMouseMove(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      x = event.pageX;
      y = event.pageY;
    } else if (event instanceof TouchEvent) {
      x = event.touches[0].pageX;
      y = event.touches[0].pageY;
    }
  }
</script>

<!-- <button class="bg-blue-500 text-white p-2" on:click={lightToggle}>
  Turn On
</button>
<button class="bg-green-500 text-white p-2" on:click={changeGlassColor}>
  Change Glass Color
</button> -->
<div
  class="relative p-16 grid grid-flow-col"
  style={`left: ${x - xAdjust}px; top: ${y - yAdjust * 2.15}px;`}
>
  {#if lightState}
    <button
      on:click={lightToggle}
      class="absolute p-20 -z-0 rounded-full animate-fade blur-3xl"
      style="background-color: {glass}; top: 2px; left: 2px;"
    />
  {/if}
  <button class=" z-10 hover:animate-wiggle-more" on:click={lightToggle}>
    {#key glass}
      <svg
        class="rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
      >
        <path
          class="transition"
          fill={glass}
          d="M29 11.06c0 6.439-5 7.439-5 13.44c0 3.098-3.123 3.359-5.5 3.359c-2.053 0-6.586-.779-6.586-3.361C11.914 18.5 7 17.5 7 11.06C7 5.029 12.285.14 18.083.14C23.883.14 29 5.029 29 11.06z"
        />
        <path
          class="animate-none"
          fill={circleColor}
          d="M22.167 32.5c0 .828-2.234 2.5-4.167 2.5c-1.933 0-4.167-1.672-4.167-2.5c0-.828 2.233-.5 4.167-.5c1.933 0 4.167-.328 4.167.5z"
        />
        <path
          class="animate-none"
          fill={filament}
          d="M22.707 10.293a.999.999 0 0 0-1.414 0L18 13.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414L17 15.414V26a1 1 0 1 0 2 0V15.414l3.707-3.707a.999.999 0 0 0 0-1.414z"
        />
        <path
          class="animate-none"
          fill={bottomRectColor}
          d="M24 31a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-6h12v6z"
        />
        <path
          class="animate-none"
          fill={linesColor}
          d="M11.999 32a1 1 0 0 1-.163-1.986l12-2a.994.994 0 0 1 1.15.822a.999.999 0 0 1-.822 1.15l-12 2a.927.927 0 0 1-.165.014zm0-4a1 1 0 0 1-.163-1.986l12-2a.995.995 0 0 1 1.15.822a.999.999 0 0 1-.822 1.15l-12 2a.927.927 0 0 1-.165.014z"
        />
      </svg>
    {/key}
  </button>
</div>

<!-- {#if lightState}
  {#if mouseFollow}
    <button
      on:click={lightToggle}
      class="absolute p-20 -z-0 bg-white/10 rounded-full animate-fade blur-3xl"
      style="background-color: {glass}; {`left: ${x - 77}px; top: ${
        y - 90
      }px;`}"
    />
  {:else}
    <button
      on:click={lightToggle}
      class="absolute p-20 -z-0 bg-white/10 rounded-full animate-fade blur-3xl"
      style="background-color: {glass}; {`left: px; top:  250px;`}"
    />
  {/if}
{/if} -->

<style>
  .transition {
    transition: fill 1s ease;
  }
</style>
