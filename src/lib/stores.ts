// stores.ts
import type { Config } from "@sveltejs/adapter-vercel";

export const config: Config = {
  runtime: "edge",
};

import { writable } from "svelte/store";

// Create a writable store with initial value 0
export const poppedBalloonCount = writable(0);
export const lightstates = writable(false);
