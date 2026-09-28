import { createContext, useContext } from 'react';

/** Set by <FlashProvider>; call with a path to fire the exposure and navigate. */
export const FlashContext = createContext(() => {});

export const useFlashTo = () => useContext(FlashContext);
