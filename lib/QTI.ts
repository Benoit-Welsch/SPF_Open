import { LongString } from "./Text";

export enum indicatorCode {
  UNKNOWN = "",
  QO = 670,
  QCM = 628,
}

export enum language {
  NL = "nl-NL",
  FR = "fr-FR",
  DE = "de-DE",
}

export class Exam extends Array<Page> {
  name: string;
  time: 900; // Time in seconde -> Default is 15 minutes
  indicatorCode = indicatorCode.UNKNOWN; // Constant required by BOSA
  testCode = ""; // UNI/UFI
  compareWithTest = ""; // Force comparaison with NL/FR/DE
  language: language;

  static fromQTI() {
    //TODO 🟢
  }

  static fromSheet(
    sheet,
    column: {
      title: string;
      prompt: string;
      correct: string;
      competency: string;
      dimension: string;
      indicator: string;
    },
    row: { offset: number }
  ) {
    let exam = new Exam();
    let currentPage: Page;
    let currentQCM: QCM;
    let currentRow = row.offset;

    let currentCDI = {
      competency: "",
      dimension: "",
      indicator: "",
    };
    while (sheet[column.prompt + currentRow]) {
      if ((currentRow - row.offset) % 5 == 0 || currentRow == row.offset) {
        if (column.competency)
          currentCDI.competency = sheet[column.competency + currentRow]
            ? sheet[column.competency + currentRow]
            : currentCDI.competency
              ? currentCDI.competency
              : "";
        if (column.dimension)
          currentCDI.dimension = sheet[column.dimension + currentRow]
            ? sheet[column.dimension + currentRow]
            : currentCDI.dimension
              ? currentCDI.dimension
              : "";
        if (column.indicator)
          currentCDI.indicator = sheet[column.indicator + currentRow]
            ? sheet[column.indicator + currentRow]
            : currentCDI.indicator
              ? currentCDI.indicator
              : "";

        currentPage = new Page({
          name: sheet[column.title + currentRow],
          ...currentCDI,
          language: language.FR,
        });

        currentQCM = new QCM();
        currentQCM.prompt.push(sheet[column.prompt + currentRow]);
        currentPage.push(currentQCM);
      } else {
        //@ts-ignore
        currentQCM.alternatives.push({
          text: sheet[column.prompt + currentRow],
          correct:
            sheet[column.correct + currentRow] &&
            sheet[column.correct + currentRow].h,
          shuffle: false,
          point: sheet[column.correct + currentRow] &&
            sheet[column.correct + currentRow].h ? 3 : -1
        });
      }
      currentRow++;
    }
    //TODO 🟢
  }

  toQTI() {
    //TODO 🔴
  }

  toCSV() {
    //TODO 🟢
  }

  toPDF() {
    //TODO 🟢
  }

  toWord() {
    //TODO 🔴
  }

  toPP() {
    //TODO 🔴
  }
}

type PageProps = {
  name: string;
  competency: string;
  dimension: string;
  indicator: string;
  language: language;
};

export class Page extends Array<Question | QCM | QO> {
  name: string;
  competency: string = "";
  dimension: string = "";
  indicator: string = "";
  language: language;

  constructor({ name, competency, dimension, indicator, language }: PageProps) {
    super(0);
    this.name = name;
    this.competency = competency;
    this.dimension = dimension;
    this.indicator = indicator;
    this.language = language;
  }

  pushAt(element: Question, pos: number) {
    this.splice(pos, 0, element);
  }
}

export class Question {
  prompt: LongString[] = [];
}
export class QCM extends Question {
  alternatives: Array<Alternative> = [];
}
export class QO extends Question {
  maxChar: number = -1;
}

export class Alternative {
  point: number;
  correct: number;
  text: LongString;
  shuffle: boolean;
}
