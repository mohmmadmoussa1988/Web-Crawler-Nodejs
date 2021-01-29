const chai = require("chai");
const expect = chai.expect;
const { search } = require("../services/api.js");

describe("Google API CALL", () => {
  it("returns an array of results", (done) => {
    search("test").then((res) => {
      expect(res.data.items).to.be.instanceof(Array);
      expect(res.data.items).to.have.length.above(0);
      done();
    });
  });
});
