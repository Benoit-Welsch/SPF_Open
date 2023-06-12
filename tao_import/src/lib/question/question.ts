export interface QO extends Question {
  answerLenght: number;
}

class Txt {
  h: string;
  r: string;
  t: string;
  v: string;
  w: string;

  constructor({ h, r, t, v, w }: { h: string, r: string, t: string, v: string, w: string }) {
    this.h = h;
    this.r = r;
    this.t = t;
    this.v = v;
    this.w = w;
  }

}

export class Question {
  id: Txt;
  prompt: Txt;

  constructor({ id, prompt }: Question) {
    this.id = id;
    this.prompt = prompt;
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
          answers: []
        })
        questions.push(currentQuestion);
      } else {
        currentQuestion.answers.push(
          {
            prompt: sheet[column.prompt + currentRow],
            correct:
              sheet[column.correct + currentRow] &&
              sheet[column.correct + currentRow].h,
          });
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

class QCM extends Question {
  answers: Answer[]


  constructor({ id, prompt, answers }: { id: Txt, prompt: Txt, answers: Answer[] }) {
    super({ id, prompt });
    this.answers = answers
  }



}




