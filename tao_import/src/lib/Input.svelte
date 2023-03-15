<script lang="ts">
  import * as XLSX from "xlsx";
  import Option from "./Option.svelte";
  import { exportToCSV, parseSheet } from "./question/questions";
  let files: FileList;
  let linkFile;

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);

    const FRSheet = parseSheet(workbook.Sheets.FR);
    const FRCSV = exportToCSV(FRSheet);
    const blob = new Blob([FRCSV], { type: "text/csv;charset=utf-8," });
    const objUrl = URL.createObjectURL(blob);
    linkFile.href = objUrl;
    linkFile.download = "tao-input";
    linkFile.click();
  };
</script>

<a bind:this={linkFile} />
<input
  type="file"
  name="zip"
  id="zip"
  accept=".xlsx"
  bind:files
  on:change={(e) => onFileSelected(e)}
/>
<Option />
