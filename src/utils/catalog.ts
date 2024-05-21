export const getSearchParamsUrl = () => {
  const paramsString = window.location.search;
  const urlParams = new URLSearchParams(paramsString);

  return urlParams;
};

export const updateSearchParam = (
  key: string,
  value: string | number,
  pathname: string
) => {
  const urlParams = getSearchParamsUrl();
  urlParams.set(key, `${value}`);
  const newPath = `${pathname}?${urlParams.toString()}`;
  window.history.pushState({ path: newPath }, '', newPath);
};
