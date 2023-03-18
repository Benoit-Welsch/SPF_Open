import { writable } from "svelte/store";

export const file = writable(null);

export const sheetNames = writable([]);

export const currentSheet = writable("");
