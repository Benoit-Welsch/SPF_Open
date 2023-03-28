<script>
  import Download from "./Input/Download.svelte";
  import DropZone from "./Input/DropZone.svelte";
  import LetterPicker from "./Input/LetterPicker.svelte";
  import RadioInput from "./Input/RadioInput.svelte";
  import {
    currentSheet,
    selectedFormat,
    hideAnswer,
    titleColumn,
    promptColumn,
    correctColumn,
    workbook,
  } from "./store";
  let sheet;

  workbook.subscribe((workbook) => {
    if (!workbook || !workbook.SheetNames) return;
    sheet = workbook.SheetNames.map((s, n) => ({ txt: s, selected: n === 0 }));
  });
</script>

<div class="menu hide-print">
  <div class="choiceSelection">
    <RadioInput
      title="Sheet"
      inputChoices={sheet}
      bind:choice={$currentSheet}
    />
    <RadioInput
      title="Format"
      inputChoices={[
        { txt: "CSV", selected: true },
        { txt: "PDF" },
        { txt: "WORD", disabled: true },
        { txt: "PPTX", disabled: true },
        { txt: "QTI", disabled: true },
      ]}
      bind:choice={$selectedFormat}
    />
    <RadioInput
      title="Compare"
      inputChoices={[
        { txt: "OFF", selected: true },
        { txt: "ON", disabled: true },
      ]}
    />
    <RadioInput
      title="Answer"
      inputChoices={[
        { txt: "Hide", selected: true, value: true },
        { txt: "Show", value: false },
      ]}
      bind:choice={$hideAnswer}
    />
    <fieldset class="columnPicker">
      <legend>Column</legend>
      <LetterPicker title="Title" bind:value={$titleColumn} />
      <LetterPicker title="Prompt" bind:value={$promptColumn} />
      <LetterPicker title="Correct" bind:value={$correctColumn} />
    </fieldset>
  </div>
  <div class="bottom">
    <Download />
    <DropZone />
  </div>
</div>

<style>
  .columnPicker {
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-items: center;
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid #00566b;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
    color: #00566b;
    min-height: 34px;
  }
  .columnPicker legend {
    color: #457e8b;
    font-size: 13px;
  }
  .menu {
    z-index: 1;
    background-color: white;
    position: fixed;
    border: 2px dotted #00566b;
    padding: 10px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: fit-content;
  }
  .choiceSelection {
    display: flex;
    max-width: 360px;
    flex-wrap: wrap;
  }
  .choiceSelection :global(fieldset:first-child) {
    width: 100%;
    height: 34px;
  }
  .menu .bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    width: 100%;
  }
</style>
