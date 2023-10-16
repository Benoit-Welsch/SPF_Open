<script lang="ts">
  import { ZipReader } from "@zip.js/zip.js";
  import html2pdf from "html2pdf.js";

  import Question from "../template/Question.svelte";
  import {
    entryToObj,
    readAndParseXml,
    xmlToObj,
    type QuestionType,
    type zipObj,
  } from "./helper";
  import Settings from "./Settings.svelte";
    import Tables from "./Tables.svelte";

  let hideAnswer = false;
  let showInstruction = false;
  let showLetter = false;
  let clientHeight;

  let files: FileList;
  let assets: zipObj[];
  let questions: QuestionType[] = [];
  let title = "Tao-PDF exporter";

  let Html;

  $: if (files) {
    const init = async () => {
      const zipReader = new ZipReader(files[0].stream());
      const entries = await zipReader.getEntries();

      const newTitle = files[0].name.split(".")[0].split("_")[0].toUpperCase();

      if (title == newTitle) return;

      title = newTitle;

      // Parse asset
      assets = entries
        .filter(
          (entry) =>
            !entry.filename.endsWith(".css") && !entry.filename.endsWith(".xml")
        )
        .map(entryToObj); // format obj

      // Parse questions
      const xmls = await Promise.all(
        entries
          .filter(
            (entry) =>
              entry.filename.endsWith(".xml") &&
              entry.filename !== "imsmanifest.xml"
          )
          .map(entryToObj) // format obj
          .map((obj) => readAndParseXml(obj, assets)) // parse xml
      );

      questions = xmls.map(xmlToObj).filter((q) => q);
    };
    init(); // Work around to use async/await
  }

  const makePdfOnClick = () => {
    html2pdf(Html, {
      filename: title + " - Export TAO",
      html2canvas: { dpi: 1200 },
      jsPDF: {
        unit: "px",
        format: [Math.min(clientHeight / 3, 14400), 1000],
      },
    });
  };
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<input type="file" name="zip" id="zip" accept=".zip" bind:files />
<Settings bind:hideAnswer bind:showInstruction bind:showLetter />
<Tables bind:questions/>
<button class="hide-print" on:click|preventDefault={() => window.print()}
  >Get PDF</button
>
<button class="hide-print" on:click|preventDefault={makePdfOnClick} disabled
  >Get long PDF (broken)</button
>
{#if questions.length > 0}
  <div class="nb-questions hide-print">
    <span class="QO"
      >QO : {questions.filter((q) => q.type === "QO").length}</span
    >
    <span class="QCM">
      QCM : {questions.filter((q) => q.type === "QCM").length}
    </span>
  </div>
  <div bind:this={Html}>
    {#each questions as question}
      {#if (question.type !== "unknown" && question.type !== "Instruction" && question.type !== "Instruction QCM" && question.type !== "Instruction QO") || ((question.type === "Instruction" || question.type === "Instruction QCM" || question.type === "Instruction QO") && showInstruction)}
        <Question bind:question bind:hideAnswer bind:showLetter />
      {/if}
    {/each}
  </div>
{/if}

<style>
</style>
