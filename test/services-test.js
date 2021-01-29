const chai = require("chai");
const expect = chai.expect;
const {
  downloadWebPage,
  createAndWriteToFile,
  fileUnlink,
  readAndAnalyzeFolder,
  loopOnFiles,
  readAndAnalyzeFile,
  countDuplicates,
} = require("../services/services");
const timestamp = require("../utils/utils").getTimeStamp();

describe("createAndWriteToFile", () => {
  it("createAndWriteToFile should create a new file", async () => {
    const fileName = "test";
    const fileContent =
      '<html><head><script src="test.js"></script></head><body></body></html>';

    const res = await createAndWriteToFile(fileName, fileContent);
    expect(res).to.be.true;
  });
  afterEach(async () => {
    const fileName = "test";
    const fileContent =
      '<html><head><script src="test.js"></script></head><body></body></html>';
    await createAndWriteToFile(fileName, fileContent);
  });
});

describe("Function between creation and deletion", () => {
  beforeEach(async () => {
    const fileName = "test";
    const fileContent =
      '<html><head><script src="test.js"></script></head><body></body></html>';
    await createAndWriteToFile(fileName, fileContent);
  });
  it("loopOnFiles should loop on files in downloaded_files", async () => {
    const res = await loopOnFiles(["test"], "test");
    expect(res).to.have.length(1);
  });
});

describe("readAndAnalyzeFolder", () => {
  beforeEach(async () => {
    const fileName = "test";
    const fileContent =
      '<html><head><script src="test.js"></script></head><body></body></html>';
    await createAndWriteToFile(fileName, fileContent);
  });
  it("should open downloaded_files folder then files and count javascript libraries and return clean results without duplications", async () => {
    const res = await readAndAnalyzeFolder("test", 1);
    expect(res).to.have.length(1);
  });
});

describe("readAndAnalyzeFile and countDuplicates", () => {
  beforeEach(async () => {
    const fileName = "test";
    const fileContent =
      '<html><head><script src="test.js"></script></head><body></body></html>';
    await createAndWriteToFile(fileName, fileContent);
  });
  it("readAndAnalyzeFile opens a file in downloaded_files analyze its content and return array of javascript libraries", async () => {
    const res = await readAndAnalyzeFile("test");
    expect(res).to.have.length(1);
  });

  it("countDuplicates gets an array and remove duplicates", async () => {
    const arr = ["test", "test"];
    const res = countDuplicates(arr);
    expect(res).to.have.length(1);
  });
  afterEach(() => {
    fileUnlink("test");
  });
});
