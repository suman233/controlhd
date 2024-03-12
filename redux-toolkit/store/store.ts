import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from "redux-persist";

//@ts-expect-error package type missing
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import rootReducer from "../slices/rootReducer";

// ...

// const middleware = [logger];
const persistConfig = {
  key: "admin",
  storage,
  version: 1.5,
  transforms: [
    encryptTransform({
      secretKey: "dvrfvgh@245[]@2056"
    })
  ]
};

const _combined = combineReducers(rootReducer);

const persistedReducer = persistReducer(
  persistConfig,
  _combined
) as unknown as typeof _combined;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  ],
  devTools: process.env.NODE_ENV === "development"
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
