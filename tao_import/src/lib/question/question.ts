export interface QO extends Question {
  answerLenght: number;
}

interface TxtType {
  h: string;
  r: string;
  t: string;
  v: string;
  w: string;
}

class Txt implements TxtType {
  h: string;
  r: string;
  t: string;
  v: string;
  w: string;

  constructor({ h, r, t, v, w }: TxtType) {
    this.h = h;
    this.r = r;
    this.t = t;
    this.v = v;
    this.w = w;
  }

  toString() {
    return this.r ? this.r : this.w;
  }
}

export class Question {
  id: Txt;
  prompt: Txt;

  constructor({ id, prompt }: Question) {
    this.id = new Txt(id);
    this.prompt = new Txt(prompt);
  }

  static parseSheet(
    sheet,
    column: { title: string; prompt: string; correct: string },
    row: { offset: number }
  ) {
    let currentRow = row.offset;
    let questions: QCM[] = [];
    let currentQuestion: QCM;

    while (sheet[column.prompt + currentRow]) {
      if ((currentRow - row.offset) % 5 == 0 || currentRow == row.offset) {
        currentQuestion = new QCM({
          id: sheet[column.title + currentRow],
          prompt: sheet[column.prompt + currentRow],
        });
        questions.push(currentQuestion);
      } else {
        currentQuestion.addAlt({
          prompt: sheet[column.prompt + currentRow],
          correct:
            sheet[column.correct + currentRow] &&
            sheet[column.correct + currentRow].h,
        })
      }
      currentRow++;
    }
    return questions;
  }
}

export interface Answer {
  prompt: Txt;
  correct: boolean;
}

export class QCM extends Question {
  answers: Answer[];

  constructor({
    id,
    prompt,
    answers,
  }: {
    id: Txt;
    prompt: Txt;
    answers?: Answer[];
  }) {
    super({ id: new Txt(id), prompt: new Txt(prompt) });
    this.answers = answers ? answers : [];
  }

  addAlt({ prompt, correct }: Answer) {
    this.answers.push({
      prompt: new Txt(prompt),
      correct
    })
  }

  getFakeId(lang: string, n: number) {
    return langZone(lang).titlePrefix + (n + 1 < 10 ? "0" + (n + 1) : n + 1).toString()
  };


}

export const langZone = (lang: string) => {
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
      titlePrefix = "Frage ";
      break;
  }
  return { zone, titlePrefix }
}
