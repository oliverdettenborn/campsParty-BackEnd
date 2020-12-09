const stringStripHtml = require('string-strip-html');

const stripHtml = (params) => {
    params = Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, stringStripHtml(value).result]));
    return params;
}

const filterObject = (obj, notAllowed) => {
  const filtered = Object.fromEntries(
      Object.entries(obj).filter(([key]) => !notAllowed.includes(key))
  );
  return filtered;
}

module.exports = {
  stripHtml,
  filterObject
}