<script lang="ts">
  import { get } from "svelte/store";
  import { exportToCSV, parseSheet } from "../question/questions";
  import {
    currentSheet,
    selectedFormat,
    workbook,
    name,
    titleColumn,
    promptColumn,
    correctColumn,
  } from "../store";

  let linkFile: HTMLAnchorElement;

  const onClick = () => {
    const fileName = get(name);
    const sheet = parseSheet(get(workbook).Sheets[get(currentSheet)], {
      title: get(titleColumn),
      prompt: get(promptColumn),
      correct: get(correctColumn),
    });
    switch (get(selectedFormat).toLocaleLowerCase()) {
      case "csv":
        const CSVString = exportToCSV(sheet);

        const blob = new Blob([CSVString], { type: "text/csv;charset=utf-8," });
        const objUrl = URL.createObjectURL(blob);

        linkFile.href = objUrl;
        linkFile.download = fileName;
        linkFile.click();
        break;
      case "pdf":
        window.print();
        break;
      default:
        console.log("Not unsuported yet");
    }
  };
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<a bind:this={linkFile} />
<button on:click|preventDefault={onClick}>
  <img src="file.svg" alt="FileIcon" />
  <span> Download Export</span>
</button>

<style>
  a {
    display: none;
  }
  button {
    cursor: pointer;
    background-color: #00566b;
    border: 3px solid #00566b;
    border-radius: 12px;
    margin-left: -1.5px;
    font-weight: bold;
    display: flex;
    color: white;
    transition: 0.3s;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-size: 16px;
    padding: 5px 0;
  }
  button:hover {
    background-color: #457e8b;
  }
  button:active {
    transform: scale(0.95);
    background-color: #00566b;
  }
  button img {
    height: 30px;
  }
</style>
