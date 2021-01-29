const chai = require("chai");
const expect = chai.expect;
const { getTimeStamp, getFileName } = require("../utils/utils");

describe("Utils Functions", () => {
  it("returns a time stamp", async () => {
    let timestamp = getTimeStamp().toString();
    expect(timestamp).to.be.a("string");
  });
  it("returns a filename", async () => {
    let timestamp = getTimeStamp();
    let domain = "http://test.com";
    let res = getFileName(timestamp, domain);
    expect(res).to.be.a("string");
  });
});
