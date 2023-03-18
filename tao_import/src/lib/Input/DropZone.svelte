<script lang="ts">
  import DropZone from "svelte-atoms/DropZone.svelte";
  import { file } from "../store";

  let fileName = "";
  const onChange = async (e) => {
    const fileTemp = e.dataTransfer
      ? e.dataTransfer.files[0]
      : e.target.files[0];
    fileName = fileTemp ? fileTemp.name : "";
    file.update(() => fileTemp);
  };
</script>

<div class="">
  <DropZone
    fileTitle={fileName}
    dropOnPage
    on:drop={onChange}
    on:change={onChange}
  />
</div>

<style>
  div {
    border: 3px solid #00566b;
    border-radius: 12px;
    margin-left: -1.5px;
  }
</style>
