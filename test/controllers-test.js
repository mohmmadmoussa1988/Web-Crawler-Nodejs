const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { createAndWriteToFile } = require("../services/services.js");
const server = require("../app");
const count = 5;
const timestamp = require("../utils/utils").getTimeStamp();
const { getFileName } = require("../utils/utils");
chai.use(chaiHttp);

describe("Controllers endpoints  tests", () => {
  it("search controller should returns a timestamp - async call, kindly wait for results", (done) => {
    chai
      .request(server)
      .post("/search")
      .send({ SearchTerm: "cars" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        let timetamp = res.body.timestamp.toString();
        expect(timetamp).to.not.be.empty;
        done();
      });
  }).timeout(0);
});

describe("create and analyze  endpoints  tests", () => {
  beforeEach(async function () {
    let fileContent = `<html><head><script src="1.js"></script><script src="2.js"></script><script src="3.js"></script><script src="4.js"></script><script src="5.js"></script></head></html>`;
    let fileName = getFileName(timestamp, "test.com");
    let res = await createAndWriteToFile(fileName, fileContent);
  });

  it(`analyzeCreatedFiles() should returns aan array if ${count} - async call, kindly wait for results`, (done) => {
    chai
      .request(server)
      .get("/search/analyze")
      .query({ timestamp: timestamp, count: count })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.values).to.be.instanceof(Array);
        expect(res.body.values).to.have.lengthOf(count);
        done();
      });
  }).timeout(0);
});
