const cheerio = require("cheerio");
const fs = require("fs");
const { DOWNLOAD_FOLDER } = require("../constants/index");
const { getPageSource } = require("./api");
const timestamp = require("../utils/utils").getTimeStamp();
const { getFileName } = require("../utils/utils");

const downloadWebPage = async (urlList) => {
  return new Promise(async (resolve, reject) => {
    urlList.forEach(async (url) => {
      try {
        let domain = new URL(url.formattedUrl);
        let fileName = getFileName(timestamp, domain.hostname);
        let webPageSource = await getPageSource(url.formattedUrl, 5000);
        if (webPageSource == "") {
          console.log("webPageSource.isAxiosError", webPageSource);
        } else {
          let fileCreated = await createAndWriteToFile(
            fileName,
            JSON.stringify(webPageSource.data).replace(/\\/g, "")
          );
        }
      } catch (err) {}
    });

    resolve(timestamp);
  });
};

const createAndWriteToFile = (fileName, fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`downloaded_files/${fileName}`, fileContent, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(true);
    });
  });
};

const fileUnlink = (fileName) => {
  const path = `${DOWNLOAD_FOLDER}/${fileName}`;
  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) {}
};

const readAndAnalyzeFolder = (timestamp, count) => {
  return new Promise((resolve, reject) => {
    fs.readdir(DOWNLOAD_FOLDER, async (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      let result = await loopOnFiles(files, timestamp);
      let finalArray = countDuplicates(result);
      finalArray = sortAndSliceArray(finalArray, count);
      resolve(finalArray);
    });
  });
};

const loopOnFiles = (files, timestamp) => {
  return new Promise(async (resolve, reject) => {
    let scriptsList = [];
    for (file of files) {
      if (file.search(timestamp) >= 0) {
        let result = await readAndAnalyzeFile(file);
        scriptsList = scriptsList.concat(result);
      }
      fileUnlink(file);
    }
    resolve(scriptsList);
  });
};

const readAndAnalyzeFile = async (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(DOWNLOAD_FOLDER + "/" + fileName, "utf8", function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      let scriptsList = [];
      $ = cheerio.load(data);
      $("script").each(function () {
        let result = $(this);
        let scriptTag = result[0].attribs.src;
        if (scriptTag) {
          let scriptFileName =
            scriptTag.substring(
              scriptTag.lastIndexOf("/") + 1,
              scriptTag.lastIndexOf(".js")
            ) + ".js";
          if (scriptFileName.indexOf("/") < 0) {
            scriptsList.push(scriptFileName);
          }
        }
      });

      resolve(scriptsList);
    });
  });
};

const countDuplicates = (arr) => {
  var result = {};
  var i = arr.length;

  while (i--) {
    if (result.hasOwnProperty(arr[i])) {
      result[arr[i]]++;
      arr.splice(i, 1);
    } else {
      result[arr[i]] = 1;
    }
  }
  let id = 0;
  let dupResult = Object.keys(result).map(function (p) {
    id++;
    return { id: id, label: p, value: result[p] };
  });
  return dupResult;
};

const sortAndSliceArray = (result, sliceNumber) => {
  result.sort(function (a, b) {
    return b.count - a.count;
  });
  let finalArray = result.slice(0, sliceNumber);
  return finalArray;
};

module.exports = {
  readAndAnalyzeFolder,
  createAndWriteToFile,
  downloadWebPage,
  fileUnlink,
  loopOnFiles,
  readAndAnalyzeFile,
  countDuplicates,
};
