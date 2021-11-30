import { transliterate } from "../src/index";

/**
 * all tests (except the first) use taamim
 */

describe("using default options", () => {
  describe("basic tests", () => {
    test.each`
      description                    | hebrew                           | transliteration
      ${"consonants"}                | ${"אבגדהוזחטיכךלמםנןסעפףצץקרשת"} | ${"ʾbgdhwzḥṭykklmmnnsʿppṣṣqršt"}
      ${"no special cases"}          | ${"רַ֛עַל"}                      | ${"raʿal"}
      ${"preserve non-Hebrew chars"} | ${"v1. רַ֛עַל"}                  | ${"v1. raʿal"}
      ${"preserve line breaks"}      | ${"v1.\n רַ֛עַל"}                | ${"v1.\n raʿal"}
    `("$description", ({ hebrew, transliteration }) => {
      expect(transliterate(hebrew)).toBe(transliteration);
    });
  });

  describe("dagesh tests", () => {
    test.each`
      description                          | hebrew         | transliteration
      ${"dagesh qal beginning of word"}    | ${"בֹּ֔סֶר"}   | ${"bōser"}
      ${"dagesh qal middle of word"}       | ${"מַסְגֵּ֖ר"} | ${"masgēr"}
      ${"dagesh chazaq - not BeGaDKePhaT"} | ${"מִנְּזָר֜"} | ${"minnǝzār"}
      ${"dagesh chazaq - BeGaDKePhaT"}     | ${"מַגָּ֖ל"}   | ${"maggāl"}
    `("$description", ({ hebrew, transliteration }) => {
      expect(transliterate(hebrew)).toBe(transliteration);
    });
  });
});
