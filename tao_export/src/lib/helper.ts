import { TextWriter, type Entry } from "@zip.js/zip.js";

export type zipObj = {
  path: any;
  dir: any;
  name: any;
  questionId: any;
  _raw: Entry;
  xml: Document | undefined;
};

export const entryToObj = (entry: Entry) => {
  const { filename, directory } = entry;
  const pathArr = filename.split("/");
  return {
    path: filename,
    dir: directory,
    name: pathArr[
      pathArr.findIndex((path: string | string[]) => path.includes("."))
    ],
    questionId: pathArr[1],
    _raw: entry,
    xml: undefined,
  };
};

export const associateAssets = (xml: zipObj, assets: zipObj[]) => {
  const asset = assets.filter((asset) => asset.questionId === xml.questionId);
  return { ...xml, assets: asset };
};

export const readAndParseXml = async (xml: zipObj) => {
  const writter = new TextWriter();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(
    await xml._raw.getData(writter),
    "text/xml"
  );
  return { ...xml, xml: xmlDoc };
};

export type QuestionType = {
  title: string;
  question: boolean;
  prompt: Element;
  answers: { txt: string; point: string; id: string; correct: boolean }[];
};

// export const insertAsset = async (html: string, assets: zipObj[]) => {
//   const write = new TextWriter();
//   const blob = new Blob([await assets[0]._raw.getData(write)]);

//   const search = 'src="assets/';
//   const start = html.indexOf(search);
//   if (start < 0) return html;
//   //console.log(html.slice(0, start - 1) + html.slice(start + end, html.length));
// };

export const xmlToObj = (xml: zipObj): QuestionType => {
  const xDoc = xml.xml;
  const title = xDoc
    .getElementsByTagName("assessmentItem")[0]
    .getAttribute("title");

  const question = !!["vraag", "question", "fraag"].find(
    (t) => t === title.toLowerCase().split(" ")[0]
  );

  if (!question) return undefined;

  // Get correct answer mapping
  const answerMapping = Array.from(
    xDoc.getElementsByTagName("mapping")[0].children
  ).map((child) => ({
    id: child.attributes[0].nodeValue,
    point: child.attributes[1].nodeValue,
    correct: Number.parseInt(child.attributes[1].nodeValue) > 0,
  }));

  // Get prompt

  const prompt = xDoc.getElementsByTagName("prompt")[0];

  const answers = Array.from(xDoc.getElementsByTagName("simpleChoice")).map(
    (answer) => ({
      txt: answer.innerHTML,
      point: answerMapping.find(
        (m) => m.id === answer.getAttribute("identifier")
      ).point,
      id: answer.getAttribute("identifier"),
      correct: answerMapping.find(
        (m) => m.id === answer.getAttribute("identifier")
      ).correct,
    })
  );
  return {
    title,
    question,
    prompt,
    answers,
  };
  //console.log(title, question);
};
