const chai = require("chai");
const expect = chai.expect;
const { checkUrl } = require("../services/validate");

describe("Validation checks", () => {
  it("returns true if correct url format sent", async () => {
    const url = "http://google.com";
    const res = checkUrl(url);
    expect(res).to.be.true;
  });
  it("returns false if wrong url format sent", async () => {
    const url = "google";
    const res = checkUrl(url);
    expect(res).to.be.false;
  });
});
