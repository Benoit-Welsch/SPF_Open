<script lang="ts">
  import { ZipReader } from "@zip.js/zip.js";
  import Question from "../template/Question.svelte";
  import {
    entryToObj,
    readAndParseXml,
    xmlToObj,
    type QuestionType,
    type zipObj,
  } from "./helper";
  import Settings from "./Settings.svelte";

  let hideAnswer = false;

  let files: FileList;
  let assets: zipObj[];
  let questions: QuestionType[] = [];
  let title = "Tao-PDF exporter";

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
              entry.filename !== "imsmanifest.xml" &&
              !entry.filename.endsWith("test.xml")
          )
          .map(entryToObj) // format obj
          .map((obj) => readAndParseXml(obj, assets)) // parse xml
      );

      questions = xmls.map(xmlToObj).filter((q) => q);
    };
    init(); // Work around to use async/await
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<input type="file" name="zip" id="zip" accept=".zip" bind:files />
<Settings bind:hideAnswer />

{#if questions.length > 0}
  <div class="nb-questions hide-print">
    <span class="QO"
      >QO : {questions.filter((q) => q.type === "QO").length}</span
    >
    <span class="QCM">
      QCM : {questions.filter((q) => q.type === "QCM").length}
    </span>
  </div>
  {#each questions as question}
    <Question {question} bind:hideAnswer />
  {/each}
{/if}

<style>
</style>
