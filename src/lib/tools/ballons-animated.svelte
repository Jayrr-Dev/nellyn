<script lang="ts">
  import { onMount } from "svelte";
  import { Sound } from "svelte-sound";
  // Declare and initialize the color variables
  export let stringColor: string = "#597B91";
  let ballonColor: string = "#FF473E";
  export let highlightColor: string = "#ffffff";
  export let width: string = "100";
  export let height: string = "100";
  import { poppedBalloonCount } from "$lib/stores";
  import ballonpop from "$lib/sounds/ballonpop.wav";
  let isPopped: boolean = false;

  // Create a sound effect
  const click_sound = new Sound(ballonpop, { volume: 0.5 });

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
  // Function to generate random position for the balloon
  function setRandomBalloonPosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    balloonTop = Math.random() * (screenHeight - 100); // Subtracting 100 to make sure the entire balloon fits in the screen
    balloonLeft = Math.random() * (screenWidth - 100); // Subtracting 100 to make sure the entire balloon fits in the screen
  }
  // Function to get the mouse position
  function getMousePosition(event: MouseEvent) {
    x = event.clientX;
    y = event.clientY;
  }

  function popBalloon() {
    isPopped = true;
    poppedBalloonCount.update((n) => n + 1); // Increment the count in the store
  }
  // Function to set the SVG position based on mouse coordinates
  function setSVGPosition() {
    svgX = x;
    svgY = y;
  }

  // Add event listener to get the mouse position
  onMount(() => {
    setRandomBalloonPosition();
    window.addEventListener("mousemove", getMousePosition);
    // window.addEventListener("click", setSVGPosition);
    // Change the balloon color when the component is created
    ballonColor = getRandomColor();
  });

  // Array of colors to choose from
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#FF5733",
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
  <div
    class="absolute animate-move-up-to-spot"
    style={`top: ${balloonTop}px; left: ${balloonLeft}px;`}
  >
    <button
      on:click={popBalloon}
      on:click={playSound}
      class="animate-wiggle animate-infinite animate-duration-[3000ms]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        {width}
        {height}
        viewBox="0 0 512 512"
      >
        <path
          fill={stringColor}
          d="M418.739 509.346a5.25 5.25 0 0 1-5.25-5.25c0-17.544-6.158-30.82-19.38-41.783c-12.365-10.254-29.586-17.544-47.818-25.262c-24.229-10.257-49.284-20.863-69.091-40.203c-22.826-22.288-33.921-52.182-33.921-91.389a5.25 5.25 0 0 1 10.5 0c0 36.23 10.061 63.666 30.757 83.875c18.388 17.956 42.515 28.169 65.848 38.047c37.853 16.023 73.604 31.159 73.604 76.715a5.249 5.249 0 0 1-5.249 5.25z"
        />
        <path
          fill={ballonColor}
          d="M259.93 302.848c.476 1.218.938 2.419 1.353 3.576c.401 1.072.768 2.109 1.114 3.091c.342 .983.7 1.912.929 2.77c.466 1.715.428 3.145.242 4.146c-.183 1.001-.538 1.572-.538 1.572c-4.965 8.009-15.482 10.476-23.491 5.511a17.323 17.323 0 0 1-5.511-5.511s-.354-.572-.538-1.572c-.186-1.001-.224-2.43 .242-4.146c.229-.858.586-1.787.929-2.77c.346-.983.713-2.019 1.114-3.091c.415-1.157.877-2.358 1.353-3.576c-34.022-13.918-90.096-81.107-106.883-144.182a123.21 123.21 0 0 1-4.899-34.483C125.347 56.151 180.497 1 248.529 1s123.182 55.151 123.182 123.182a123.21 123.21 0 0 1-4.899 34.483c-16.787 63.075-72.86 130.265-106.882 144.183z"
        />
        <path
          fill={highlightColor}
          d="M195.957 124.182c0 22.075-10.33 39.97-23.073 39.97s-23.073-17.895-23.073-39.97s10.33-39.97 23.073-39.97c12.743.001 23.073 17.896 23.073 39.97z"
        />
      </svg>
    </button>
  </div>
{:else}
  <button
    class="absolute animate-fall-and-fade"
    style={`top: ${svgY}px; left: ${svgX}px;`}
  >
    <div class="animate-wiggle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="gold"
          d="m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26"
        /></svg
      >
    </div>
  </button>
{/if}
