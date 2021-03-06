import {
  chapterIntroParser,
  chapterIntroTester,
  viewChapterIndex,
  viewChapterNumber,
  viewChapterTopic,
} from "./chapter-intro-tester";
import {chapterIntro} from "../category-types";

describe('chapterIntroTester', () => {
  it('should return true for matches', () => {
    expect(chapterIntroTester([`Chapter 7 "Culture C" Introduction`])).toEqual(true);
    expect(chapterIntroTester([`Chapter 7 Introduction`])).toEqual(true);
    expect(chapterIntroTester([`Chapter Introduction`])).toEqual(true);
    expect(chapterIntroTester([`Introduction to Chapter 7 "Culture C"`])).toEqual(true);
    expect(chapterIntroTester([`Introduction to Chapter 7`])).toEqual(true);
    expect(chapterIntroTester([`Introduction to Chapter "Culture C"`])).toEqual(true);
    expect(chapterIntroTester([`Introduction to Chapter`])).toEqual(true);
  });

  it('should return false for non-matches', () => {
    expect(chapterIntroTester(['Contextualised Worship Service'])).toEqual(false);
    expect(chapterIntroTester(['Introduction to Course'])).toEqual(false);
  });
});

describe('viewChapterIndex', () => {
  it('should get index in post-intro', () => {
    expect(viewChapterNumber(['Chapter 7 "Culture C" Introduction', '7', `"Culture C"`])).toEqual('7');
  });
  it('should get index in pre-intro', () => {
    expect(viewChapterNumber([`Introduction to Chapter 7 "Culture C"`, undefined, undefined, '7', `"Culture C"`])).toEqual('7');
  });
});

describe('viewChapterTopic', () => {
  it('should get topic in post-intro', () => {
    expect(viewChapterTopic(['Chapter 7 "Culture C" Introduction', '7', `"Culture C"`])).toEqual(`"Culture C"`);
  });

  it('should get topic in pre-intro', () => {
    expect(viewChapterTopic([`Introduction to Chapter 7 "Culture C"`, undefined, undefined, '7', `"Culture C"`])).toEqual(`"Culture C"`);
  });
});

describe('chapterIntroParser', () => {
  it('should return devotion object for matches', () => {
    expect(chapterIntroParser([`Chapter 7 "Culture C" Introduction`]).number).toEqual(7);
    expect(chapterIntroParser([`Chapter 7 "Culture C" Introduction`]).topic).toEqual('Culture C');
    expect(chapterIntroParser([`Chapter 7 "Culture C" Introduction`]).category).toEqual(chapterIntro);

    expect(chapterIntroParser([`Introduction to Chapter 7 "Culture C"`]).number).toEqual(7);
    expect(chapterIntroParser([`Introduction to Chapter 7 "Culture C"`]).topic).toEqual('Culture C');
    expect(chapterIntroParser([`Introduction to Chapter 7 "Culture C"`]).category).toEqual(chapterIntro);
  });

  it('should return empty for missing topic', () => {
    expect(chapterIntroParser([`Chapter 7 Introduction`]).number).toEqual(7);
    expect(chapterIntroParser([`Chapter 7 Introduction`]).topic).toEqual('');
    expect(chapterIntroParser([`Chapter 7 Introduction`]).category).toEqual(chapterIntro);

    expect(chapterIntroParser([`Introduction to Chapter 7`]).number).toEqual(7);
    expect(chapterIntroParser([`Introduction to Chapter 7`]).topic).toEqual('');
    expect(chapterIntroParser([`Introduction to Chapter 7`]).category).toEqual(chapterIntro);
  });

  it('should return -1 for missing index', () => {
    expect(chapterIntroParser([`Chapter "Culture C" Introduction`]).number).toEqual(-1);
    expect(chapterIntroParser([`Chapter "Culture C" Introduction`]).topic).toEqual('Culture C');
    expect(chapterIntroParser([`Chapter "Culture C" Introduction`]).category).toEqual(chapterIntro);

    expect(chapterIntroParser([`Introduction to Chapter "Culture C"`]).number).toEqual(-1);
    expect(chapterIntroParser([`Introduction to Chapter "Culture C"`]).topic).toEqual('Culture C');
    expect(chapterIntroParser([`Introduction to Chapter "Culture C"`]).category).toEqual(chapterIntro);
  });

  it('should return -1 empty for missing', () => {
    expect(chapterIntroParser([`Chapter Introduction`]).number).toEqual(-1);
    expect(chapterIntroParser([`Chapter Introduction`]).topic).toEqual('');
    expect(chapterIntroParser([`Chapter Introduction`]).category).toEqual(chapterIntro);

    expect(chapterIntroParser([`Introduction to Chapter`]).number).toEqual(-1);
    expect(chapterIntroParser([`Introduction to Chapter`]).topic).toEqual('');
    expect(chapterIntroParser([`Introduction to Chapter`]).category).toEqual(chapterIntro);
  });

  it('should throw for non-matches', () => {
    expect(() => chapterIntroParser(['Contextualised Worship Service'])).toThrow(/not chapter intro strings/i);
    expect(() => chapterIntroParser(['Introduction to Course'])).toThrow(/not chapter intro strings/i);
  });
});
