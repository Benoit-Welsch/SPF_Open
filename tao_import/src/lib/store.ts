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

// Row
export const rowOffset = writable(7);

// Detect any change to column/row event
export const column_row = derived(
  [titleColumn, promptColumn, correctColumn, rowOffset],
  ([$titleColumn, $promptColumn, $correctColumn, $rowOffset]) => [
    $titleColumn,
    $promptColumn,
    $correctColumn,
    $rowOffset,
  ]
);

// Pdf
export const TaoPreviewBind = writable(null);
