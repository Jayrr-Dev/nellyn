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
  import DraggbleObject from "$lib/tools/draggble-object.svelte";
  import HoldToTrigger from "$lib/tools/hold-to-trigger.svelte";
  import GiftBox from "$lib/tools/gift-box.svelte";
  import { Sound } from "svelte-sound";
  import MysteryBox from "$lib/tools/mystery-box.svelte";
  import hbd from "$lib/music/hbd.mp3";
  import ripping from "$lib/sounds/ripping.mp3";
  import { lightstates, poppedBalloonCount } from "$lib/stores";
  import { get } from "svelte/store";
  import { tooltip } from "@svelte-plugins/tooltips";
  import Delay from "$lib/tools/delay.svelte";
  let ballonpopCount = 0;
  let condition = true;
  let lightState: boolean = false;
  let sceneState: number = 0;
  let button1 = false;
  let releaseBox = false;
  let hasPlayed = false;
  let releaseGift = false;
  let openCard = false;
  let alreadyRun = false;
  const hbd_mp3 = new Sound(hbd, { loop: true });

  onMount(() => {
    randomXY();
    loopHBD;
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

  lightstates.subscribe((value) => {
    lightState = value;
  });

  poppedBalloonCount.subscribe((value) => {
    ballonpopCount = value;
  });

  function loopHBD() {
    if (!hasPlayed) {
      setTimeout(() => {
        // Check if the audio has already been played
        hbd_mp3.play();
        sceneState = 2;
        hasPlayed = true; // Mark the audio as played
      }, 1000);
    }
  }

  function startScene() {
    setTimeout(() => {
      sceneState = ++sceneState;
    }, 1000);
  }

  function handleHeldLongEnough() {
    releaseBox = true;
  }
  let animate = "";
  $: if (sceneState == 2) {
    animate = "animate-wiggle animate-infinite";
  }

  // function oneLastThing() {
  //   if (alreadyRun) return;

  //   setTimeout(() => {
  //     openCard = true;
  //   }, 1000);

  //   setTimeout(() => {
  //     openCard = false;
  //   }, 300000);

  //   alreadyRun = true;
  // }

  function releaseGifts() {
    releaseGift = true;
  }

  $: if (ballonpopCount == 6) {
    releaseGifts();
  }

  function openTheCard() {
    openCard = true;
  }
  function closeTheCard() {
    openCard = false;
  }
</script>

<!-- <Typewriter {messages} speed="3" />

<button on:click={() => (condition = !condition)}>Toggle</button> -->
<!-- {ballonpopCount}
{sceneState} -->
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
    <!-- <div class="p-5">ddddd</div> -->
    <SingleTypewriter
      delay={2000}
      speed={1.5}
      textToDisplay={[
        "",
        "",
        "Hi Nelly...",
        "I might have forgotten to tell you something...",
        "I tend to go overboard with my birthday presents.",
        "But anyways...",
        "",
        "Its a bit dark in here...",
        "",
        "Find the light switch.",
        "Use the little lightbulb to find it.",
      ]}
    />

    <Lightbulb />
  {:else if sceneState == 1}
    <SingleTypewriter
      color={"#333333"}
      delay={2000}
      speed={1.5}
      textToDisplay={[
        "",
        "",
        "",
        "",
        "",
        "",
        "Ugh my eyes,",
        "",
        "",
        "its too bright in here...",
        "",
        "I hope you like it!",
        "That's it!",
        "",
        "",
        "",
        "I hope you took that as joke",
        "You know me better than that...",
        "",
        "I go overboard with when I do things",
        "...and when I procrastinate.",
        "",
        "Say...",
        "Its a bit empty in here...",
        "",
        "Here take this",
        "",
        "Your first present...",
        "Let's decorate!",
        "I'll give you couple seconds",
        ".",
        "Just drag it around",
        "..",
        "..",
        "..",
        "Wait, where's the music box...",
        "..",
        "...",
        "...",
        "...",
        "Done?",
        "I hope you like it!",
        "That's it!",
        "",
        "",
        "Wait, I forgot something...",
        "Here take this too",
        "Try waving the wand around...",
        "",
        "",
        "You're a wizard Nelly",
      ]}
    />

    <HoldToTrigger on:heldlongenough={handleHeldLongEnough}>
      <MysteryBox delay="118000">
        <!-- Wand 118000 -->
        <DraggbleObject>
          <div class="p-16">
            <svg
              class="hover:animate-wiggle-more z-10"
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 36 36"
            >
              <!-- shading -->
              <path
                fill="#292F33"
                d="M3.651 29.852L29.926 3.576c.391-.391 2.888 2.107 2.497 2.497L6.148 32.349c-.39.391-2.888-2.107-2.497-2.497z"
              />
              <!-- shading -->
              <path
                fill="#66757F"
                d="M30.442 4.051L4.146 30.347l.883.883L31.325 4.934z"
              />
              <!-- wand ends -->
              <path
                fill="#E1E8ED"
                d="m34.546 2.537l-.412-.412l-.671-.671a.967.967 0 0 0-.255-.169a.988.988 0 0 0-1.159.169l-2.102 2.102l.495.495l.883.883l1.119 1.119l2.102-2.102a.999.999 0 0 0 0-1.414zM5.029 31.23l-.883-.883l-.495-.495l-2.209 2.208a.988.988 0 0 0-.169 1.159c.046.09.094.18.169.255l.671.671l.412.412a.999.999 0 0 0 1.414 0l2.208-2.208l-1.118-1.119z"
              />
              <!-- wand ends -->
              <path
                fill="#F5F8FA"
                d="m31.325 4.934l2.809-2.809l-.671-.671a.967.967 0 0 0-.255-.169l-2.767 2.767l.884.882zM4.146 30.347L1.273 33.22c.046.09.094.18.169.255l.671.671l2.916-2.916l-.883-.883z"
              />

              <!-- stars -->
              <path
                class="animate-pulse animate-ease-in-out animate-infinite"
                fill="#FFAC33"
                d="m28.897 14.913l1.542-.571l.6-2.2a.667.667 0 0 1 1.287 0l.6 2.2l1.542.571a.665.665 0 0 1 0 1.25l-1.534.568l-.605 2.415a.667.667 0 0 1-1.293 0l-.605-2.415l-1.534-.568a.665.665 0 0 1 0-1.25M11.961 5.285l2.61-.966l.966-2.61a1.103 1.103 0 0 1 2.07 0l.966 2.61l2.609.966a1.103 1.103 0 0 1 0 2.07l-2.609.966l-.966 2.61a1.105 1.105 0 0 1-2.07 0l-.966-2.61l-2.61-.966a1.104 1.104 0 0 1 0-2.07M24.13 20.772l1.383-.512l.512-1.382a.585.585 0 0 1 1.096 0l.512 1.382l1.382.512a.584.584 0 0 1 0 1.096l-1.382.512l-.512 1.382a.585.585 0 0 1-1.096 0l-.512-1.382l-1.383-.512a.585.585 0 0 1 0-1.096"
              /></svg
            >
          </div>
        </DraggbleObject>
      </MysteryBox>
    </HoldToTrigger>
  {:else if sceneState == 2}
    <Delay duration={13000}>
      {#each ballonsArray as _, i}
        <BallonsAnimated key={i} />
      {/each}
    </Delay>
  {/if}

  {#if sceneState == 0}
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
  {:else if sceneState == 1 || sceneState == 2}
    <MysteryBox delay="62000">
      <!-- Banner 62000 -->
      <DraggbleObject>
        <div class="w-72 h-32 {animate} ">
          <img
            class="pointer-events-none"
            src="/img/bd-banner.png"
            alt="banner"
          />
        </div>
      </DraggbleObject>
    </MysteryBox>

    <MysteryBox delay="70000">
      <!-- 24 -->
      <DraggbleObject>
        <div class="w-72 h-32 {animate} animate-infinite">
          <img class="pointer-events-none" src="/img/24.png" alt="banner" />
        </div>
      </DraggbleObject>
    </MysteryBox>

    <MysteryBox delay="76000">
      <!-- Adrianna -->
      <DraggbleObject>
        <div class="w-96 h-28 {animate} animate-infinite">
          <img class="pointer-events-none" src="/img/ada.png" alt="banner" />
        </div>
      </DraggbleObject>
    </MysteryBox>
  {/if}

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
      id="whiteout"
      class="absolute top-0 left-0 h-full w-full -z-40 bg-white/90"
    />
    <!-- card -->
  {:else if sceneState == 2}
    <div class="absolute top-0 left-0 h-full w-full -z-40 bg-white/90">
      <img
        transition:fade={{
          delay: 4000,
          duration: 4000,

          baseScale: 0.5,
        }}
        src="/img/bd-background.png"
        alt="birthday cake"
        id="blackout"
        class="w-full animate-slow-scroll -z-40"
      />'
    </div>
    <SingleTypewriter
      delay={2000}
      speed={1.5}
      textToDisplay={[
        "",
        "",
        "",
        "",
        "",
        "Surprise! Hahaha",
        "I know I'm full of it",
        "",
        "",
        "Speaking of which",
        "I got one more thing to show you...",
        "You'll love it.",
        "",
        "Pop some ballons... Till you find it",
        "...",
        "",
      ]}
    />
    {#if openCard}
      <button
        on:click={closeTheCard}
        class="absolute bottom-0 h-44 w-80 animate-scale-up2x"
      >
        <img class="pointer-events-none" src="/img/b-card.png" alt="card" />
      </button>

      <SingleTypewriter
        delay={2000}
        speed={1.3}
        bottom={"150px"}
        fontFamily={"serif"}
        color={"#333333"}
        textToDisplay={[
          "",
          "",
          "",
          "Today is...",
          "as beautiful as other days",
          "but you realize",
          "another year has gone",
          "in the blink of an eye",
          "however",
          "Do you know?",
          "today is just special",
          "so special to you",
          "that's why",
          "Let's make it...",
          "the best celebration ever",
          "and let me share...",
          "a piece of happiness with you",
          "I made all this...",
          "as a birthday present for you",
          "thanks for being there",
          "thanks for the connection we've made",
          "thanks for everything",
          "I wish you all the best",
          "May your life be at ease",
          "May all your wishes come true",
          "Remember",
          "your ambitions",
          "you'll make it... and",
          "you'll fly high",
          "So... Now it's your last year.",
          "the real story of your life",
          "is just about to begin",
          "indeed...",
          "but...",
          "don't worry",
          "because...",
          "God has your back",
          "and",
          "this year will be better",
          "and I hope",
          "you'll find...",
          "happiness along the way",
          "keep your spirit up",
          "enjoy every single moment...",
          "that you experience today",
          "fill it with your most beautiful smile",
          "and make it the best memory...",
          "lastly...",
          "I'd like to wish you one more time",
          "a very happy birthday, Adriana",
        ]}
      />
    {/if}
  {/if}

  {#if releaseBox == true}
    <MysteryBox delay="0">
      <!-- Music Player -->
      <button on:click={loopHBD} class="hover:animate-wiggle">
        <DraggbleObject>
          <div class="w-44 h-44">
            <img
              class="pointer-events-none"
              src="/img/musicplayer.png"
              alt="banner"
            />
          </div>
        </DraggbleObject>
      </button>
    </MysteryBox>
  {/if}

  {#if releaseGift}
    <GiftBox delay="1">
      <!-- giftcard -->
      <button on:dblclick={openTheCard}>
        {#if !openCard}
          <DraggbleObject>
            <div
              title="Double Click"
              use:tooltip={{
                maxWIdth: "200px",
                style: {
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                  opacity: "0.1",
                  fontSize: "10px",
                },
              }}
              class="w-44 h-44"
            >
              <img
                class="pointer-events-none"
                src="/img/b-cover.png"
                alt="banner"
              />
            </div>
          </DraggbleObject>
        {/if}
      </button>
    </GiftBox>
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
