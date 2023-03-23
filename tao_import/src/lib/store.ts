import { writable } from "svelte/store";

export const file = writable(null);

export const name = writable("TAO");

export const workbook = writable(null);

export const sheetNames = writable([]);

export const currentSheet = writable("");

export const selectedFormat = writable("");

export const TaoPreviewBind = writable(null);

export const hideAnswer = writable(true);
