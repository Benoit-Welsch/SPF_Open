export type txtOption = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export class Txt {
  bolder = false;
  italics = false;
  underlined = false;
  txt: string

  constructor(v: string, options?: txtOption) {
    this.txt = v;
    if (options) {
      const { bold, italic, underline } = options
      this.bolder = bold;
      this.italics = italic;
      this.underlined = underline;
    }

  }

  bold() {
    this.bolder = !this.bold
    return this.bold
  }

  italic() {
    this.italics = !this.italics
    return this.italics
  }

  underline() {
    this.underlined = !this.underlined
    return this.underlined
  }

  toString() {
    return this.txt;
  }

  encode(rules: encodingRule[]) {
    rules.forEach(({ from, to }) => {
      //@ts-expect-error
      this.txt = this.txt.replaceAll(from, to);
    })
  }
}

export type encodingRule = {
  from: RegExp | string,
  to: string
}

export class LongString extends Array<Array<Txt>>{
  constructor(s: string) {
    super()
    if (!s) return
    s.toString().split("\n").forEach(line => this.push(line.split(" ").map(word => new Txt(word))))
  }

  toString() {
    return this.map(line => line.map(v => v.toString()).join(' ')).join("\n")
  }

  encode(rules: encodingRule[]) {
    this.forEach((l) => {
      l.forEach(w => {
        w.encode(rules)
      })
    })
  }
}



export class Question {
  id: string;
  prompt: string;

  competency?: string;
  dimension?: string;
  indicator?: string;

}