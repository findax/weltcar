const priceWithComma = (value: string | number) => {
  if (isNaN(value as number)) {
    return value;
  }
  return Number(value).toLocaleString('en-US') + ' €';
};
export default priceWithComma;
