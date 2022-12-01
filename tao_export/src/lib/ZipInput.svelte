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

  let files: FileList;
  let assets: zipObj[];
  let questions: QuestionType[] = [];

  $: if (files) {
    const init = async () => {
      const zipReader = new ZipReader(files[0].stream());
      const entries = await zipReader.getEntries();

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
          .map(readAndParseXml) // parse xml
      );

      questions = xmls.map(xmlToObj).filter((q) => q);
    };
    init(); // Work around to use async/await
  }
</script>

<input type="file" name="zip" id="zip" accept=".zip" bind:files />
{#if questions.length > 0}
  {#each questions as question}
    <Question {question} />
  {/each}
{/if}
