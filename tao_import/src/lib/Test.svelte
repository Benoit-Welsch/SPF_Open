<script lang="ts">
  import { exportToQTI, type QCM } from "./question/questions";

  const QCMs: QCM[] = Array(10)
    .fill({})
    .map((_, n) => ({
      id: { h: n, r: n, t: n, v: n, w: n },
      prompt: "I'm a prompt",
      answers: Array(4)
        .fill({})
        .map((_, m) => ({
          correct: m === 1,
          prompt: { h: m, r: m, t: m, v: m, w: m },
        })),
    }));

  console.log(exportToQTI(QCMs, { lang: "FR" }).toString());
</script>
