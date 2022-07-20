import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountsReducer from "../features/accounts/accountsSlice";
import connectionReducer from "../features/connection/connectionSlice";
import messagesReducer from "../features/messages/messagesSlice";
import consoleReducer from "../features/console/consoleSlice";
import nftsReducer from "../features/nfts/nftsSlice";
import collectionsReducer from "../features/collections/collectionsSlice";
import collectionTraitsReducer from "../features/collectionTraits/collectionTraitsSlice";
import tokenPricesReducer from "../features/tokenPrices/tokenPricesSlice";
import rarityRankReducer from "../features/rarityRanks/rarityRanksSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = persistReducer(
  persistConfig,
  combineReducers({
    accounts: accountsReducer,
    connection: connectionReducer,
    messages: messagesReducer,
    console: consoleReducer,
    nfts: nftsReducer,
    collectionStates: collectionsReducer,
    collectionTraitsStates: collectionTraitsReducer,
    tokenPrices: tokenPricesReducer,
    rarityRank: rarityRankReducer,
  })
);

export const store = configureStore({
  reducer,
  // middleware: (mw) => mw({ serializableCheck: false }),
  middleware: (mw) => mw({ immutableCheck: false, serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
