const dataFilterObj = (obj) => {
  const newObj = {};
  const arr = Object.keys(obj);
  arr.map((item) => {
    if (obj[item]) {
      newObj[item] = obj[item];
    }
  });
  return newObj;
};
module.exports = { dataFilterObj };
