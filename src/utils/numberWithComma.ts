const numberWithComma = (number: string | number) => {
  return Number(number).toLocaleString('en-US');
};
export default numberWithComma;
