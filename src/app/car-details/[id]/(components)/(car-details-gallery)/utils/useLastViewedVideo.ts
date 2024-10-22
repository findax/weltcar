import { createGlobalState } from 'react-hooks-global-state';

const initialState = { videoToScrollTo: null };
const { useGlobalState } = createGlobalState(initialState);

export const useLastViewedVideo = () => {
  return useGlobalState('videoToScrollTo');
};
