const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Vitor Felix",
        id: 123,
        profession: "Software Engineer",
        birthDay: 1992,
      },
      {
        name: "Marisa Monte",
        id: 243,
        profession: "Cantora",
        birthDay: 1985,
      },
      {
        name: "Ana Maria",
        id: 349,
        profession: "Javascript Specialist",
        birthDay: 1973,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
  {
    const filePath = "./mocks/invalid-header.csv";
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
})();
