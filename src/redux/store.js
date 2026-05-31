import { configureStore, combineReducers } from "@reduxjs/toolkit";
import rafflesReducer from "./slices/raffles";
import contestantsReducer from "./slices/contestants";
import userReducer from "./slices/user";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  raffles: rafflesReducer,
  contestants: contestantsReducer,
  user: userReducer,
});

export const RESET_STORE = "RESET_STORE";

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["raffles", "contestants", "user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});
export const persistor = persistStore(store);
