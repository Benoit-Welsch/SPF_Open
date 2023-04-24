import { create } from "xmlbuilder2";

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
  column: { title: string; prompt: string; correct: string },
  row: { offset: number }
) => {
  let currentRow = row.offset;
  let questions: QCM[] = [];
  let currentQuestion: QCM;

  while (sheet[column.prompt + currentRow]) {
    if ((currentRow - row.offset) % 5 == 0 || currentRow == row.offset) {
      currentQuestion = {
        id: sheet[column.title + currentRow],
        prompt: sheet[column.prompt + currentRow],
      };
      currentQuestion.answers = [];
      questions.push(currentQuestion);
    } else {
      currentQuestion.answers.push({
        prompt: sheet[column.prompt + currentRow],
        correct:
          sheet[column.correct + currentRow] &&
          sheet[column.correct + currentRow].h,
      });
    }
    currentRow++;
  }
  return questions;
};

export const exportToQTI = (questions: QCM[], { lang }: { lang: string }) => {
  const { zone, titlePrefix } = langPrefix(lang);
  let questionsManifest = [];
  const manifest = create({ version: "1.0" })
    .ele("manifest", {
      identifier: "QTI-TEST-MANIFEST-tao" + Math.floor(Math.random() * 1000000),
      xmlns: "http://www.imsglobal.org/xsd/imscp_v1p1",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation": [
        "http://www.imsglobal.org/xsd/imscp_v1p1",
        "http://www.imsglobal.org/xsd/qti/qtiv2p2/qtiv2p2_imscpv1p2_v1p0.xsd",
        "http://ltsc.ieee.org/xsd/LOM",
        "http://www.imsglobal.org/xsd/imsmd_loose_v1p3p2.xsd",
      ].join(" "),
      "xmlns:imsmd": "http://ltsc.ieee.org/xsd/LOM",
    })
    .ele("metadata")
    .ele("schema")
    .txt("QTIv2.2 Package")
    .up()
    .ele("schemaversion")
    .txt("1.0.0")
    .up()
    .up()
    .ele("organizations")
    .up()
    .ele("resources");

  questions.forEach((q, n) => {
    // Manifest creation
    const href = `items/${n}/qti.xml`;
    manifest
      .ele("resource", {
        identifier: n + "idk",
        type: "imsqti_item_xmlv2p2",
        href,
      })
      .ele("metadata")
      .ele("imsmd:lom")
      .ele("imsmd:classification")
      .ele("imsmd:taxonPath")
      .ele("imsmd:source")
      .ele("imsmd:string", { "xml:lang": zone })
      .txt("http://www.w3.org/2000/01/rdf-schema#label")
      .up()
      .up()
      .ele("imsmd:taxon")
      .ele("imsmd:entry")
      .ele("imsmd:string", { "xml:lang": zone })
      .txt(titlePrefix + n);

    manifest.ele("file", { href });

    // Question file creation
    let questionQti = create({ version: "1.0" })
      .ele("assessmentItem", {
        title: titlePrefix + n,
        identifier: n + "",
        labal: titlePrefix + n,
        "xml:lan": zone,
      })
      .ele("responseDeclaration", {
        identifier: "RESPONSE",
        cardinality: "single",
        baseType: " identifier",
      })
      .ele("correctResponse")
      .ele("value")
      .txt(`<![CDATA[choice_${q.answers.findIndex((a) => a.correct) + 1}]]>`)
      .up()
      .up()
      .ele("mapping", { defaultValue: "0" });
    q.answers.forEach((a, n) => {
      questionQti.ele("mapEntry", {
        mapKey: `choice_${n + 1}`,
        mappedValue: a.correct ? "3" : "-1",
      });
    });
    questionQti = questionQti
      .up()
      .up()
      .ele("outcomeDeclaration", {
        identifier: "SCORE",
        cardinality: "single",
        baseType: "float",
        normalMaximum: "3",
      })
      .up()
      .ele("outcomeDeclaration", {
        identifier: "MAXSCORE",
        cardinality: "single",
        baseType: "float",
      })
      .up()
      .ele("defaultValue")
      .ele("value")
      .txt("3")
      .up()
      .up()
      .ele("itemBody")
      .ele("div", { class: "grid-row" })
      .ele("div", { class: "col-12" })
      .ele("choiceInteraction", {
        reposonseIdentifier: "RESPONSE",
        shuffle: "true",
        maxChoices: "1",
        minChoices: "0",
        orientation: "vertical",
      })
      .ele("prompt")
      .ele("div")
      .up()
      .ele("strong")
      .txt(q.prompt.r)
      .up()
      .ele("div")
      .up()
      .up();

    q.answers.forEach((a, n) => {
      questionQti
        .ele("simpleChoice", {
          identifier: `choice_${n + 1}`,
          fixed: "false",
          showHide: "show",
        })
        .txt(a.prompt.r);
    });
    questionsManifest.push(questionQti.root());
  });
  return { manifest: manifest.root(), questionsManifest };
};

const detectLangage = () => {
  // TODO :
};
