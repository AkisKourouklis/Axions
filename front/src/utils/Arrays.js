export const replaceAt = (array, index, value) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};

export const removeAt = (array, i) => {
  const ret = items.slice(0, i - 1).concat(array.slice(i, array.length));
  return ret;
};
