import { derived, writable } from "svelte/store";

// file input
export const file = writable(null);
export const name = writable("TAO");
export const workbook = writable(null);

// Menu
export const currentSheet = writable("");
export const selectedFormat = writable("");
export const hideAnswer = writable(true);
export const langOutput = writable("FR");

// Column
export const titleColumn = writable("D");
export const promptColumn = writable("F");
export const correctColumn = writable("G");
// Detect any change to column event
export const column = derived(
  [titleColumn, promptColumn, correctColumn],
  ([$titleColumn, $promptColumn, $correctColumn]) => [
    $titleColumn,
    $promptColumn,
    $correctColumn,
  ]
);

// Pdf
export const TaoPreviewBind = writable(null);
