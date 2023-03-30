<script lang="ts">
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
    langOutput,
  } from "./store";
  let sheet: { txt: string; selected: boolean }[];

  workbook.subscribe((workbook) => {
    if (!workbook || !workbook.SheetNames) return;
    sheet = workbook.SheetNames.map((s: string, n: number) => ({
      txt: s,
      selected: n === 0,
    }));
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
        { txt: "QTI" },
      ]}
      bind:choice={$selectedFormat}
    />
    <RadioInput
      title="Langage"
      inputChoices={[
        { txt: "FR" },
        { txt: "NL" },
        { txt: "DE" },
      ]}
      bind:choice={$langOutput}
    />
    <RadioInput
      title="Answer"
      inputChoices={[
        { txt: "Hide", selected: true, value: true },
        { txt: "Show", value: false },
      ]}
      bind:choice={$hideAnswer}
    />
    <RadioInput
      title="Compare"
      inputChoices={[
        { txt: "OFF", selected: true },
        { txt: "ON", disabled: true },
      ]}
    />
  </div>

  <fieldset class="columnPicker">
    <legend>Column</legend>
    <div>
      <label for="Title-letter">Title</label>
      <LetterPicker title="Title" bind:value={$titleColumn} />
    </div>
    <div>
      <label for="Prompt-letter">Prompt</label>
      <LetterPicker title="Prompt" bind:value={$promptColumn} />
    </div>
    <div>
      <label for="Answer-letter">Answer</label>
      <LetterPicker title="Answer" bind:value={$correctColumn} />
    </div>
  </fieldset>

  <div class="bottom">
    <Download />
    <DropZone />
  </div>
</div>

<style>
  .columnPicker {
    display: flex;
    flex-direction: row;
    gap: 8px;
    width: fit-content;
    font-weight: bold;
    border-radius: 12px;
    border: 3px solid #00566b;
    color: #00566b;
    padding-top: 0;
  }
  .columnPicker legend,
  .columnPicker label {
    color: #457e8b;
    font-size: 13px;
  }
  .columnPicker > div {
    gap: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    height: 85vh;
    width: fit-content;
  }
  .choiceSelection {
    display: flex;
    max-width: 360px;
    flex-wrap: wrap;
  }
  .choiceSelection :global(fieldset:first-child) {
    width: 100%;
  }
  .menu .bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    width: 100%;
  }
</style>
