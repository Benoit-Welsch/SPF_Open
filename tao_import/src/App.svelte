<script lang="ts">
  import * as XLSX from "xlsx";
  import Menu from "./lib/Menu.svelte";
  import PreviewTao from "./lib/question/PreviewTAO.svelte";
  import { parseSheet } from "./lib/question/questions";
  import { currentSheet, file, hideAnswer, sheetNames } from "./lib/store";

  let currentSheetHolder = [];
  let workbook;

  file.subscribe(async (f) => {
    if (!f) return;
    currentSheetHolder = [];
    workbook = XLSX.read(await f.arrayBuffer());
    sheetNames.set(workbook.SheetNames);
  });

  currentSheet.subscribe(async (name) => {
    if (!name) return;
    setTimeout(() => {
      currentSheetHolder = parseSheet(workbook.Sheets[name]);
    }, 100);
  });
</script>

<main>
  <div class="left">
    <Menu />
  </div>
  <PreviewTao bind:QCMs={currentSheetHolder} bind:hideAnswer={$hideAnswer} />
</main>

<style>
  main {
    min-width: 1280px;
    min-height: 100vh;
    margin: 50px 25px;
    display: flex;
    justify-items: center;
  }
  .left {
    width: 400px;
  }
  main :global(.questions) {
    width: calc(100% - 400px);
  }

  @media only screen and (max-width: 1280px) {
    .left :global(.menu) {
      position: relative;
    }
  }
  @media print {
    .left {
      display: none;
    }
    main :global(.questions) {
      width: 80%;
    }
  }
</style>
