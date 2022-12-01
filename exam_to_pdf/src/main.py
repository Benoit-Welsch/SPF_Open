from jinja2 import Environment, FileSystemLoader
import xml.etree.ElementTree as ET
from weasyprint import HTML
from html import escape
import zipfile

url = "{http://www.imsglobal.org/xsd/imsqti_v2p2}"


class QTI:
    def __init__(self, input_zip):
        zip = zipfile.ZipFile(input_zip)

        questions = []
        assets = []

        for name in zip.namelist():
            if not name.find("css") == -1:
                continue

            elif (
                not name.find("xml") == -1
                and name.find("tests") == -1
                and name.find("imsmanifest.xml") == -1
            ):
                try:
                    questions.append(Question(zip.open(name)))
                except Exception as e:
                    print(e)
            elif not name.find("png") == -1:
                assets.append(zip.open(name))

        self.questions = questions
        self.assets = assets

    def makeTemplate(self):
        env = Environment(loader=FileSystemLoader("."))
        template = env.get_template("template.html")

        template_vars = {"questions": self.questions}

        return template.render(template_vars)

    def makePDF(self):
        return HTML(
            string=self.makeTemplate(),
        )


class Question:
    root = None

    title = None
    mappedValue = None
    prompt = None
    answer = None

    def __init__(self, xml):
        self.root = ET.parse(xml).getroot()
        self.title = self.root.get("title")

        self.mappedValue = self.find("mapping")
        self.prompt = self.find("prompt")
        self.answer = self.findAll("simpleChoice")

        self.htmlPrompt = []
        for div in self.prompt.iter().__next__():
            txt = "&nbsp;" if div.text == "\xa0" else div.text
            tag = self.getTag(div)
            self.htmlPrompt.append(
                "<" + tag + ">" + self.deepXmlToHtml(div) + "</" + tag + ">"
            )

        self.answersList = []
        for div in self.answer:
            answer = {}
            answer["txt"] = self.deepXmlToHtml(div)
            answer["id"] = div.attrib["identifier"]
            for mapped in self.mappedValue.iter():
                if mapped.get("mapKey") == answer["id"]:
                    answer["point"] = mapped.get("mappedValue")
                    answer["correct"] = answer["point"] == "3"
            self.answersList.append(answer)

    def find(self, str):
        return self.root.find(".//{http://www.imsglobal.org/xsd/imsqti_v2p2}" + str)

    def findAll(self, str):
        return self.root.findall(".//{http://www.imsglobal.org/xsd/imsqti_v2p2}" + str)

    def getTag(self, element):
        return element.tag.removeprefix(url)

    def deepXmlToHtml(self, element):

        childs = element.findall("./")
        newElement = []

        if len(childs) == 0:
            return element.text if element.text else ""
        else:
            for child in childs:

                tag = self.getTag(child)
                if tag == "img":
                    newElement.append(
                        "<"
                        + tag
                        + ' src="'
                        + child.get("src")
                        + '"'
                        + ">"
                        + self.deepXmlToHtml(child)
                        + "</"
                        + tag
                        + ">"
                    )

                else:
                    newElement.append(
                        "<" + tag + ">" + self.deepXmlToHtml(child) + "</" + tag + ">"
                    )
        return "".join(newElement)
