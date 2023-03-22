<script lang="ts">
  import type { QCM } from "./questions";
  import { TaoPreviewBind } from "../store";

  export let QCMs: QCM[] = [];
</script>

<div class="questions" bind:this={$TaoPreviewBind}>
  {#each QCMs as QCM}
    <div
      class="question"
      style=" page-break-inside: avoid !important;
    break-inside: avoid-page !important;"
    >
      <div class="title">{QCM.id}</div>
      <div class="prompt">
        <br />
        {QCM.prompt}
        <br />
        <br />
      </div>
      <ul class="answers">
        {#each QCM.answers as answer}
          <li class={`answer ${answer.correct ? "correct" : ""}`}>
            <div class="text">{answer.prompt}</div>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>

<style>
  .question {
    font-family: "Source Sans Pro";
    display: flex;
    flex-direction: column;
    border: 3px solid #007f9f;
    margin: 30px 10px;
    margin-top: 0;
    min-width: 700px;
    line-height: 1.4;
    font-size: 14px;
    page-break-inside: avoid !important;
    break-inside: avoid-page !important;
  }

  .title {
    padding: 1px 0px 3px 5px;
    background-color: #007f9f;
    color: white;
    font-size: 18px;
    font-weight: bold;
    height: fit-content;
  }

  .prompt {
    padding: 0 0 0 5px;
    font-weight: bold;
  }

  .answers {
    margin: 0;
    display: flex;
    flex-direction: column;
    border: 6px solid #f5f4f2;
    padding: 5px;
    padding-left: 20px;
    list-style: circle;
  }

  .answer {
    position: relative;
    padding: 10px;
    font-weight: bold;
  }

  .answer.correct {
    list-style-type: disc;
  }

  .answer .points {
    position: absolute;
    font-weight: bold;
    right: -22px;
    top: 0;
    border: 2px solid #266d9c;
    padding: 2px 3px;
    background-color: white;
    width: 12px;
    text-align: center;
  }
</style>
