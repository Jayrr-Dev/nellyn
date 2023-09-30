<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // Type definitions
  type Coordinates = {
    x: number;
    y: number;
  };

  type DraggingState = {
    dx: number;
    dy: number;
  } | null;

  // Initialize a unique id for this instance of the component
  let id = Math.random().toString(36).substr(2, 10);

  // Define state variable within the component scope
  let state: {
    dragging: DraggingState;
    pos: Coordinates;
    eventToCoordinates: (event: PointerEvent) => Coordinates;
  } = {
    dragging: null,
    pos: { x: 0, y: 0 },
    eventToCoordinates(event: PointerEvent) {
      return { x: event.clientX, y: event.clientY };
    },
  };

  onMount(() => {
    const el = document.getElementById(id) as HTMLElement;

    // Event listeners for drag actions
    function start(event: PointerEvent) {
      if (event.button !== 0) return;
      const { x, y } = state.eventToCoordinates(event);
      state.dragging = { dx: state.pos.x - x, dy: state.pos.y - y };
      el.setPointerCapture(event.pointerId);
    }

    function end(event: PointerEvent) {
      state.dragging = null;
    }

    function move(event: PointerEvent) {
      if (!state.dragging) return;
      const { x, y } = state.eventToCoordinates(event);
      state.pos = { x: x + state.dragging.dx, y: y + state.dragging.dy };
    }

    el.addEventListener("pointerdown", start);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("pointermove", move);
    el.addEventListener("touchstart", (e) => e.preventDefault());
  });

  $: style = `transform: translate(${state.pos.x}px, ${state.pos.y}px)`;
</script>

<!-- Use the generated id -->
<div {id} {style} class="cursor-pointer" transition:fade>
  <slot />
</div>
