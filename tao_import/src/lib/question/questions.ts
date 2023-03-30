import { create } from 'xmlbuilder2';

const headerSCV = [
  "name",
  "question",
  "shuffle",
  "language",
  "min_choices",
  "max_choices",
  "choice_1",
  "choice_2",
  "choice_3",
  "choice_4",
  "choice_1_score",
  "choice_2_score",
  "choice_3_score",
  "choice_4_score",
  "correct_answer",
];

export interface Txt {
  h: string;
  r: string;
  t: string;
  v: string;
  w: string;
}

export interface Question {
  id: Txt;
  prompt: Txt;
}

export interface answer {
  prompt: Txt;
  correct: boolean;
}

export interface QCM extends Question {
  answers?: answer[];
}

export interface QO extends Question {
  answerLenght: number;
}

export const langPrefix = (lang) => {
  let zone = "";
  let titlePrefix = "";
  switch (lang) {
    case "FR":
      zone = "fr-FR";
      titlePrefix = "QCM ";
      break;
    case "NL":
      zone = "nl-NL";
      titlePrefix = "MKV ";
      break;
    case "DE":
      zone = "de-DE";
      titlePrefix = "MCF ";
      break;
  }
  return { zone, titlePrefix };
};

export const exportToCSV = (questions: QCM[], { lang }: { lang: string }) => {
  const prefix = langPrefix(lang);

  let lines = [];
  lines.push(headerSCV.join(";"));
  questions.forEach((question, n) => {
    let line = [];
    line.push('"' + (prefix.titlePrefix + n).toString().trim() + '"');
    line.push(
      '"' +
        (question.prompt.v ? question.prompt.v : question.prompt.w).trim() +
        '"'
    );
    line.push(1);
    line.push(prefix.zone);
    line.push(0);
    line.push(1);
    line.push(
      question.answers
        .map(
          (answ) => '"' + (answ.prompt.v ? answ.prompt.v : answ.prompt.w) + '"'
        )
        .map((v) => (typeof v === "string" ? v.trim() : v))
        .join(";")
    );
    line.push(
      question.answers.map((answ) => (answ.correct ? "3" : "-1")).join(";")
    );
    line.push("choice_" + (question.answers.findIndex((q) => q.correct) + 1));
    lines.push(line.join(";"));
  });
  return lines.map((l) => l.replace(/(\r\n|\n|\r)/gm, " ")).join("\r\n");
};

export const parseSheet = (
  sheet,
  column: { title: string; prompt: string; correct: string }
) => {
  let row = 7;
  let questions: QCM[] = [];
  let currentQuestion: QCM;

  while (sheet[column.prompt + row]) {
    if ((row - 7) % 5 == 0 || row == 7) {
      currentQuestion = {
        id: sheet[column.title + row],
        prompt: sheet[column.prompt + row],
      };
      currentQuestion.answers = [];
      questions.push(currentQuestion);
    } else {
      currentQuestion.answers.push({
        prompt: sheet[column.prompt + row],
        correct: sheet[column.correct + row] && sheet[column.correct + row].h,
      });
    }
    row++;
  }
  return questions;
};

export const exportToQTI = (questions: QCM[], { lang }: { lang: string }) => {
  const {zone, titlePrefix} = langPrefix(lang)
  const root = create({ version: '1.0' })
  .ele('manifest', )
    .ele('metadata')
      .ele('schema').txt('QTIv2.2 Package').up()
      .ele('schemaversion').txt('1.0.0').up()
    .up()
    .ele('resources')

  questions.forEach((q,n) => {
    // Manifest creation
    const href = `items/${n}/qti.xml`
    root
      .ele('resource', {identifier: n + "", type: "imsqti_item_xmlv2p2", href})
        .ele("metadata")
          .ele('imsmd:lom')
          .ele('imsmd:clasification')
          .ele('imsmd:taxonPath')
          .ele('imsmd:taxon')
          .ele('imsmd:entry')
          .ele('imsmd:string', {"xml:lang": zone}).txt(titlePrefix + n)
          .up().up().up().up().up().up().up()
          .ele("file", {href})

    // Question file creation
  })
  return root.up()
};

const detectLangage = () => {
  // TODO :
};
