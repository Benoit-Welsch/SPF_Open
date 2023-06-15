<script lang="ts">
  import { get } from "svelte/store";
  import * as XLSX from "xlsx";
  import Menu from "./lib/Menu.svelte";
  import PreviewTao from "./lib/question/PreviewTAO.svelte";
  import {
    column_row,
    correctColumn,
    currentSheet,
    file,
    hideAnswer,
    promptColumn,
    rowOffset,
    titleColumn,
  } from "./lib/store";
  import { Question } from "./lib/question/question";

  let questions = [];
  let workbook;

  const parseAndShow = () => {
    if (!workbook) return;
    setTimeout(() => {
      questions = Question.parseSheet(
        workbook.Sheets[get(currentSheet)],
        {
          title: get(titleColumn),
          prompt: get(promptColumn),
          correct: get(correctColumn),
        },
        { offset: get(rowOffset) }
      );
    }, 100);
  };

  file.subscribe(async (f) => {
    if (!f) return;
    questions = [];
    workbook = XLSX.read(await f.arrayBuffer());
  });

  column_row.subscribe(async () => {
    parseAndShow();
  });

  currentSheet.subscribe(async () => {
    parseAndShow();
  });
</script>

<main>
  <div class="left">
    <Menu />
  </div>
  <!-- <PreviewSvg /> -->
  <PreviewTao bind:QCMs={questions} bind:hideAnswer={$hideAnswer} />
</main>

<style>
  main {
    min-width: 1280px;
    display: flex;
    justify-items: center;
  }
  .left {
    width: 400px;
    margin: 50px 50px;
  }
  main :global(.questions) {
    width: calc(100% - 400px);
    margin: 50px 50px;
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
