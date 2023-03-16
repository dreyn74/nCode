const getRandId = (type) => {
  return `${type ? type : "undefined"}-${Math.floor(
    (1 + Math.random()) * 0x10000
  )
    .toString(16)
    .substring(1)
    .toString()}`;
};

export const useRandId = () => {
  return {
    getRandId
  };
};
