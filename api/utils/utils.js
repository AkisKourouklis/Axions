const mongoose = require('mongoose');
const slugify = require('slugify');

const toObjectId = (id) => mongoose.Types.ObjectId(id);
const fse = require('fs-extra');

const getIP = (req) => {
  let ip = req.get('x-forwarded-for') || req.ip;

  if (ip && ip.includes(', ')) {
    // eslint-disable-next-line
    ip = ip.split(', ')[0];
  }

  if (ip && ip.includes('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }

  if (ip === '::1') {
    ip = 'localhost';
  }
  return ip;
};

const makeSlug = (text) =>
  slugify(text, {
    replacement: '-', // replace spaces with replacement
    remove: /[*+~.()'"!:@]/g, // regex to remove characters
    lower: true // result in lower case
  });

const getString = (value) => (value || '').toString();

const getDateIfValid = (value) => {
  const date = Date.parse(value);
  return Number.isNaN(date) ? null : new Date(date);
};

const getArrayIfValid = (value) => (Array.isArray(value) ? value : null);

const isNumber = (value) => !Number.isNaN(parseFloat(value)) && Number.isFinite(value);

const getNumberIfValid = (value) => (isNumber(value) ? parseFloat(value) : null);

const getNumberIfPositive = (value) => {
  const n = getNumberIfValid(value);
  return n && n >= 0 ? n : null;
};

const getBooleanIfValid = (value, defaultValue = null) => {
  if (value === 'true' || value === 'false') {
    return value === 'true';
  }
  return typeof value === 'boolean' ? value : defaultValue;
};

const transliterate = (() => {
  const accents = {
    a: 'àáâãäåæ',
    c: 'ç',
    e: 'èéêëæ',
    i: 'ìíîï',
    n: 'ñ',
    o: 'òóôõöø',
    s: 'ß',
    u: 'ùúûü',
    y: 'ÿ',
    ο: 'ό',
    ό: 'ο',
    ά: 'α',
    α: 'ά',
    έ: 'ε',
    ε: 'έ',
    ή: 'η',
    η: 'ή',
    ί: 'ι',
    ι: 'ί',
    ώ: 'ω',
    ω: 'ώ'
  };
  const chars = /[aceinosuyοόάαέεήηίιώω]/g;

  return function makeComp(input) {
    return input.replace(chars, (c) => `[${c}${accents[c]}]`);
  };
})();

const deleteFileFromTemp = async (file) => {
  try {
    if (await fse.pathExists(`./uploads/tmp/${file}`)) {
      await fse.remove(`./uploads/tmp/${file}`);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getArrayIfValid,
  getBooleanIfValid,
  getDateIfValid,
  getIP,
  deleteFileFromTemp,
  getNumberIfPositive,
  getNumberIfValid,
  getString,
  isNumber,
  makeSlug,
  toObjectId,
  transliterate
};
