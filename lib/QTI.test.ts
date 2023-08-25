import { it, expect } from "vitest";
import { LongString, Txt } from './QTI';

const txt = `Hello "world" !
I'm a multiline text.
lorem ipsum ok`
const longString = new LongString(txt);

it('Should parse a string', () => {
  const res = [
    [new Txt("Hello"), new Txt('"world"'), new Txt("!")],
    [new Txt("I'm"), new Txt("a"), new Txt("multiline"), new Txt("text.")],
    [new Txt("lorem"), new Txt("ipsum"), new Txt("ok")]
  ];
  expect(longString).toMatchObject(res)
  expect(longString.toString()).toBe(txt)
})

it('Should encode a string', () => {
  const res = [
    [new Txt("Hello"), new Txt('""world""'), new Txt("!")],
    [new Txt("I'm"), new Txt("a"), new Txt("multiline"), new Txt("text.")],
    [new Txt("lorem"), new Txt("ipsum"), new Txt("ok")]
  ];
  const rules = [
    {
      from: /(\r\n|\n|\r)/gm,
      to: " ",
    },
    {
      from: '"',
      to: '""',
    },
  ];
  longString.encode(rules)
  expect(longString).toMatchObject(res)
})