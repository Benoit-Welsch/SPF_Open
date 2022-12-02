<script lang="ts">
  import type { QuestionType, zipObj } from "../lib/helper";
  export let question: QuestionType;
  //export let assets: zipObj[];

  let questionDom;

  $: if (questionDom) {
    //console.log(questionDom);
  }
</script>

<div>
  <div class="question" bind:this={questionDom}>
    <div class="title">{question.title}</div>
    <div class="prompt">
      {#each question.prompt as prompt}
        {@html prompt.innerHTML}
      {/each}
    </div>

    <ul class="answers">
      {#each question.answers as answer}
        <li class={`answer ${answer.correct ? "correct" : ""}`}>
          <div class="text">{@html answer.txt}</div>
          <div class="points">{answer.point}</div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  @media print {
    div {
      break-inside: avoid;
    }
  }

  .question {
    font-family: "Source Sans Pro";
    display: flex;
    flex-direction: column;
    border: 3px solid #007f9f;
    margin: 30px 10px;
    max-width: 1000px;
    line-height: 1.4;
    font-size: 14px;
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
