import { TextWriter, BlobWriter, type Entry } from "@zip.js/zip.js";

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

export const readAndParseXml = async (xml: zipObj, assets: zipObj[]) => {
  const writter = new TextWriter();
  const parser = new DOMParser();

  const xmlDoc = parser.parseFromString(
    await xml._raw.getData(writter),
    "text/xml"
  );

  // Inject assets
  const imgs = xmlDoc.getElementsByTagName("img");

  if (imgs.length > 0) {
    await Promise.all(
      Array.from(imgs).map(async (img) => {
        const data = {
          id: img.getAttribute("src").split("/").pop(),
          src: img.getAttribute("src"),
          alt: img.getAttribute("alt"),
          type: img.getAttribute("type"),
          width: img.getAttribute("width"),
        };
        const asset = assets.find((asset) => asset.name === data.id);
        if (asset) {
          const writter = new BlobWriter();
          asset._raw.getData(writter);
          img.setAttribute("src", URL.createObjectURL(await writter.getData()));
          img.parentElement.replaceChild(img, img);
        }
      })
    );
  }

  return { ...xml, xml: xmlDoc };
};

export type QuestionType = {
  title: string;
  type: "QCM" | "QO" | "unknown";
  prompt: Element[];
  answers: { txt: string; point: string; id: string; correct: boolean }[];
};

export const xmlToObj = (xml: zipObj): QuestionType => {
  const xDoc = xml.xml;
  const title = xDoc
    .getElementsByTagName("assessmentItem")[0]
    .getAttribute("title");

  if (
    !!["Voorbeeld", "Exemple"].find((t) =>
      title.toLowerCase().includes(t.toLowerCase())
    )
  )
    return undefined;

  const QCM = xDoc.getElementsByTagName("mapping").length > 0

  const QO =
    xDoc.getElementsByTagName("extendedTextInteraction").length > 0 ||
    xDoc.getElementsByTagName("textEntryInteraction").length > 0;
  if (!QCM && !QO) return undefined;

  let answers;
  let prompt;

  if (QO) {
    answers = [];
    prompt = Array.from(xDoc.getElementsByTagName("itemBody"));
  } else {
    prompt = Array.from(xDoc.getElementsByTagName("prompt"));
    // Get correct answer mapping
    if (xDoc.getElementsByTagName("mapping").length === 0) {
      return undefined;
    }
    const answerMapping = Array.from(
      xDoc.getElementsByTagName("mapping")[0].children
    ).map((child) => ({
      id: child.attributes[0].nodeValue,
      point: child.attributes[1].nodeValue,
      correct: Number.parseInt(child.attributes[1].nodeValue) > 0,
    }));
    answers = Array.from(xDoc.getElementsByTagName("simpleChoice")).map(
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
  }

  //console.log(QCM)

  //console.log(QCM ? "QCM" : QO ? "QO" : "unknown",);

  return {
    title,
    type: answers.length > 0 ? "QCM" : "QO",
    prompt,
    answers,
  };
  //console.log(title, question);
};
