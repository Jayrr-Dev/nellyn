<script lang="ts">
  // @ts-nocheck

  // usually this import strategy should work:
  //import {Motion} from "svelte-motion";
  // import { draw } from "svelte/transition";
  // import { quintOut } from "svelte/easing";
  // import Motion from "svelte-motion/src/motion/MotionSSR.svelte";
  // import Icon from "@iconify/svelte";
  //components
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import { cubicInOut } from "svelte/easing";
  import type { Config } from "sveltejs/adapter-vercel";
  import { fade } from "svelte/transition";
  import Typewriter from "$lib/tools/typewriter.svelte";
  import BallonsAnimated from "$lib/tools/ballons-animated.svelte";
  import Lightbulb from "$lib/tools/lightbulb.svelte";
  import RandomMover from "$lib/tools/random-mover.svelte";
  import HiddenObject from "$lib/tools/hidden-object.svelte";
  import SingleTypewriter from "$lib/tools/single-typewriter.svelte";
  import { lightstates } from "$lib/stores";
  import { get } from "svelte/store";
  let condition = true;
  let lightState: boolean = false;
  let sceneState: number = 0;
  let button1 = false;
  onMount(() => {
    randomXY();
  });
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -1000 },
  };
  // Generate a random number between 5 to 20 for the number of balloons
  const numOfBallons: number = Math.floor(Math.random() * 20) + 15;

  // Create an array of that length
  const ballonsArray: number[] = Array.from(
    { length: numOfBallons },
    (_, i) => i + 1
  );
  let i = -1;

  const messages = [
    "Hello, world!",
    "This is a test.",
    "This is only a test.",
    "If this were a real message, it would have content.",
  ];

  lightstates.subscribe((value) => {
    lightState = value;
  });

  function startScene() {
    setTimeout(() => {
      sceneState = ++sceneState;
    }, 1000);
  }
</script>

<!-- <Typewriter {messages} speed="3" />

<button on:click={() => (condition = !condition)}>Toggle</button> -->

<body
  class=" h-[200vh] w-[200vw] overflow-hidden"
  style="

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
overflow: hidden;"
>
  {#if sceneState == 0}
    <SingleTypewriter
      delay={4000}
      speed={1.5}
      textToDisplay={[
        "",
        "It's kinda dark in here...",
        "Find the Light Switch",
      ]}
    />
    <Lightbulb />

    <HiddenObject>
      <button
        transition:fade
        class="p-10"
        on:click={startScene}
        on:click={() => {
          button1 = true;
        }}
      >
        {#if !button1}
          <Icon
            icon="line-md:switch-off-filled-to-switch-filled-transition"
            height="100"
            width="100"
          />
        {:else}
          <Icon
            icon="line-md:switch-filled-to-switch-off-filled-transition"
            height="100"
            width="100"
          />
        {/if}
      </button>
    </HiddenObject>
  {:else if sceneState == 1}
    <SingleTypewriter
      delay={3000}
      speed={2}
      textToDisplay={[
        "",
        "",
        "",
        "Its a bit empty in here...",
        "Let's decorate!",
        "Where is this music player?",
      ]}
    />
  {/if}
  <!-- {#each ballonsArray as _, i}
    <BallonsAnimated key={i} />
  {/each} -->

  <!-- backgrounds -->
  {#if sceneState == 0}
    <div
      id="blackout"
      class="absolute top-0 left-0 h-full w-full -z-40 bg-black"
    />
  {:else if sceneState == 1}
    <div
      transition:fade={{
        delay: 4000,
        duration: 4000,

        baseScale: 0.5,
      }}
      id="blackout"
      class="absolute top-0 left-0 h-full w-full -z-40 bg-white/90"
    />
  {/if}
</body>
<!-- {#if sceneState == 0}
<button class="p-10" on:click={(sceneState = 1)}>
  <Icon
    icon="line-md:switch-off-filled-to-switch-filled-transition"
    height="100"
    width="100"
  />
</button>
{:else}
<button class="p-10">
  <Icon
    icon="line-md:switch-filled-to-switch-off-filled-transition
  "
    height="100"
    width="100"
  />
</button>
{/if} -->
