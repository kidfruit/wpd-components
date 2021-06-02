export const MinMaxFunction = (model, value) => {
  let differ, result;
  switch (model) {
    case 'min':
      if (value.min == -Infinity) return value.min;
      differ = value.max - value.min;
      if (differ === 0) differ = value.min;
      differ = differ * 0.15;
      result = Math.floor(value.min - differ);
      if (value.min < 0) return result;
      else return Math.max(0, result);
    case 'max':
      if (value.max == Infinity) return value.max;
      differ = value.max - value.min;
      if (differ === 0) differ = value.max;
      differ = differ * 0.15;
      result = Math.ceil(value.max + differ);
      if (result < 0) return 0;
      else return result;
  }
};
