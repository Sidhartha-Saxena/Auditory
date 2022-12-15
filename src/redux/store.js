import { configureStore} from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';

import {shazamCoreApi ,shazamCoreApi2} from './services/shazamCore'

import accentColorSlice from './features/accentColorSlice';

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]:shazamCoreApi.reducer,
    [shazamCoreApi2.reducerPath]:shazamCoreApi2.reducer,
    player: playerReducer,
    accentColor:accentColorSlice
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(shazamCoreApi.middleware).concat(shazamCoreApi2.middleware)
});
