<script lang="ts">
  import { get } from "svelte/store";
  import { BlobReader, ZipWriter, BlobWriter } from "@zip.js/zip.js";
  import { exportToCSV, exportToQTI } from "../helper/questions";
  import {
    currentSheet,
    selectedFormat,
    workbook,
    name,
    titleColumn,
    promptColumn,
    correctColumn,
    langOutput,
    rowOffset,
    competencyColumn,
    dimensionColumn,
    indicatorColumn,
  } from "../helper/store";
  import { Question } from "../helper/question";

  let linkFile: HTMLAnchorElement;

  const onClick = () => {
    const fileName = get(name);
    const sheet = Question.parseSheet(
      get(workbook).Sheets[get(currentSheet)],
      {
        title: get(titleColumn),
        prompt: get(promptColumn),
        correct: get(correctColumn),
        competency: get(competencyColumn),
        dimension: get(dimensionColumn),
        indicator: get(indicatorColumn),
      },
      { offset: get(rowOffset) }
    );
    switch (get(selectedFormat).toLocaleLowerCase()) {
      case "csv":
        const CSVString = exportToCSV(sheet, { lang: get(langOutput) });

        const blob = new Blob([CSVString], { type: "text/csv;charset=utf-8," });
        const objUrl = URL.createObjectURL(blob);

        linkFile.href = objUrl;
        linkFile.download = fileName;
        linkFile.click();
        break;
      case "pdf":
        window.print();
        break;
      case "qti":
        const { manifest, questionsManifest } = exportToQTI(sheet, {
          lang: get(langOutput),
        });

        const manifestBlob = new Blob([manifest.toString()], {
          type: "text/xml",
        });
        const questionsManifestBlob = questionsManifest.map(
          (q) => new Blob([q.toString()], { type: "text/xml" })
        );

        new Promise(async (resolve, reject) => {
          const zipFileStream = new TransformStream();
          const zipFileBlobPromise = new Response(
            zipFileStream.readable
          ).blob();

          const zipWriter = new ZipWriter(new BlobWriter("application/zip"));

          // Create manifest xml file
          await zipWriter.add("imsmanifest.xml", new BlobReader(manifestBlob));

          await Promise.all(
            questionsManifestBlob.map((b, n) =>
              zipWriter.add(`items/${n}/qti.xml`, new BlobReader(b))
            )
          );

          const finalBlob = await zipWriter.close();

          linkFile.setAttribute("href", URL.createObjectURL(finalBlob));
          linkFile.download = fileName + ".zip";
          linkFile.click();
        });

        break;
      default:
        console.log("Not unsuported yet");
    }
  };
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<a bind:this={linkFile} download />
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
