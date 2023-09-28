<script lang="ts">
  import { fade } from "svelte/transition";

  // Reactive variables to hold the colors
  let glass = "#c0c0c0";
  let circleColor = "#ffffff";
  let filament = "#000000";
  let bottomRectColor = "#99AAB5";
  let linesColor = "#CCD6DD";

  let lightState = false;

  // Color palette for random colors
  const randomColor = ["#003049", "#d62828", "#f77f00", "#fcbf49", "#eae2b7"];

  // Function to change the glass color to a random color from the palette
  function changeGlassColor() {
    const randomIndex = Math.floor(Math.random() * randomColor.length);
    glass = randomColor[randomIndex];
  }

  function lightToggle() {
    lightState = !lightState;
    if (lightState) {
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
</script>

<!-- Buttons to trigger color changes -->
<button class="bg-blue-500 text-white p-2" on:click={lightToggle}>
  Change Colors
</button>
<button class="bg-green-500 text-white p-2" on:click={changeGlassColor}>
  Change Glass Color
</button>

<!-- SVG with reactive color variables -->
<div class="hover:animate-wiggle-more">
  {#key glass}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
    >
      <!-- ... your SVG paths with class 'transition' added -->
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

      <!-- ... the rest of your SVG -->
    </svg>
  {/key}
</div>

<!-- Styles to handle transition -->
<style>
  .transition {
    transition: fill 1s ease;
  }
</style>
