// stores.ts
import { writable } from "svelte/store";

// Create a writable store with initial value 0
export const poppedBalloonCount = writable(0);
