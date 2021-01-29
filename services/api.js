const axios = require("axios").default;
const { CX, KEY, SEARCH_ENGINE_URL } = require("../constants/index");
const search = async (searchTerm) => {
  return await axios.get(
    SEARCH_ENGINE_URL,
    {
      params: {
        key: KEY,
        cx: CX,
        q: searchTerm,
      },
    },
    { timeout: 0 }
  );
};

const getPageSource = async (url, timeout) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.get(url, { timeout: timeout });
      resolve(res);
    } catch (err) {
      reject("");
    }
  });
};

module.exports = { getPageSource, search };
