<script lang="ts">
  import DropZone from "svelte-atoms/DropZone.svelte";
  import { file, name, workbook } from "../store";
  import * as XLSX from "xlsx";

  let fileName = "";
  const onChange = async (e) => {
    const fileTemp = e.dataTransfer
      ? e.dataTransfer.files[0]
      : e.target.files[0];
    fileName = fileTemp ? fileTemp.name : "";
    file.update(() => fileTemp);
    name.update(() => fileName.split(".").slice(0, -1).join());

    const data = await fileTemp.arrayBuffer();
    /* data is an ArrayBuffer */
    workbook.update(() => XLSX.read(data));
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
