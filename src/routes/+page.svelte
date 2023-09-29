<script lang="ts">
  // @ts-nocheck

  // usually this import strategy should work:
  //import {Motion} from "svelte-motion";
  // import { draw } from "svelte/transition";
  // import { quintOut } from "svelte/easing";
  // import Motion from "svelte-motion/src/motion/MotionSSR.svelte";
  // import Icon from "@iconify/svelte";
  //components
  import type { Config } from "sveltejs/adapter-vercel";
  import Typewriter from "$lib/tools/typewriter.svelte";
  import BallonsAnimated from "$lib/tools/ballons-animated.svelte";
  import Lightbulb from "$lib/tools/lightbulb.svelte";
  import RandomMover from "$lib/tools/random-mover.svelte";
  import { onMount } from "svelte";

  let condition = true;
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -1000 },
  };
  // Generate a random number between 5 to 20 for the number of balloons
  const numOfBallons: number = Math.floor(Math.random() * 20) + 5;

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
</script>

<!-- <Typewriter {messages} speed="3" />

<button on:click={() => (condition = !condition)}>Toggle</button> -->

<body class=" background h-[200vh] overflow-hidden">
  {#each ballonsArray as _, i}
    <BallonsAnimated key={i} />
  {/each}
  <Lightbulb mouseFollow="" />
</body>

<style>
  /* :global(*) {
    box-sizing: border-box;
  } */
  .background {
    background: linear-gradient(250deg, rgb(242, 182, 104), rgb(150, 150, 250));
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
</style>
