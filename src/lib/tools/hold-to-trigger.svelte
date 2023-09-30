<script lang="ts">
  import { onDestroy } from "svelte";

  let timer: any;
  const HOLD_DURATION = 3000; // 6 seconds

  function handlePressStart() {
    timer = setTimeout(() => {
      triggerEvent();
    }, HOLD_DURATION);
  }

  function handlePressEnd() {
    clearTimeout(timer);
  }

  function triggerEvent() {
    // Here, you can emit an event or execute any code you want
    dispatch("heldlongenough");
  }

  // Clear the timer if the component is destroyed
  onDestroy(() => {
    clearTimeout(timer);
  });

  // Event dispatching
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<button
  on:pointerdown={handlePressStart}
  on:pointerup={handlePressEnd}
  on:mouseleave={handlePressEnd}
  on:touchstart={handlePressStart}
  on:touchend={handlePressEnd}
  on:touchcancel={handlePressEnd}
>
  <slot />
</button>
<!--
     <HoldToTrigger on:heldlongenough={handleHeldLongEnough}>
  <button>Hold me!</button>
</HoldToTrigger>
 -->
