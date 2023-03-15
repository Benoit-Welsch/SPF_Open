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

export interface Question {
  id: string;
  prompt: string;
}

export interface answer {
  prompt: string;
  correct: boolean;
}

export interface QCM extends Question {
  answers?: answer[];
}

export interface QO extends Question {
  answerLenght: number;
}

export const exportToCSV = (questions: QCM[]) => {
  let lines = [];
  lines.push(headerSCV.join(";"));
  questions.forEach((question) => {
    let line = [];
    line.push(question.id);
    line.push('"' + question.prompt + '"');
    line.push(1);
    line.push("fr-FR");
    line.push(0);
    line.push(1);
    line.push(question.answers.map((answ) => answ.prompt).join(";"));
    line.push(
      question.answers.map((answ) => (answ.correct ? "3" : "-1")).join(";")
    );
    line.push("choice_" + (question.answers.findIndex((q) => q.correct) + 1));
    lines.push(line.join(";"));
  });
  return lines.join("\r\n");
};

export const parseSheet = (sheet) => {
  let row = 7;
  let questions: QCM[] = [];
  let currentQuestion: QCM;

  while (sheet["F" + row]) {
    if ((row - 7) % 5 == 0 || row == 7) {
      currentQuestion = { id: sheet["D" + row].h, prompt: sheet["F" + row].h };
      currentQuestion.answers = [];
      questions.push(currentQuestion);
    } else {
      currentQuestion.answers.push({
        prompt: sheet["F" + row].h,
        correct: sheet["G" + row] && sheet["G" + row].h,
      });
    }
    row++;
  }
  return questions;
};
