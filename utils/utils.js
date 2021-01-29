const getTimeStamp = () => {
  const timestamp = new Date().getTime();
  return timestamp;
};

const getFileName = (timestamp, domain) => {
  let randomNumber = Math.floor(Math.random() * 1000);
  let fileName = timestamp + "-" + randomNumber + "-" + domain;
  return fileName;
};

module.exports = { getTimeStamp, getFileName };
