import { storage } from "src/lib";
import { STORAGE_FAV_KEY } from "./consts";

export const repository = {
  saveFavoritesByUserId(userId, favorites = []) {
    const data = storage.get(STORAGE_FAV_KEY) ?? {};
    data[userId] = favorites;
    storage.set(STORAGE_FAV_KEY, data);
  },
  getFavoritesByUserId(userId) {
    return storage.get(STORAGE_FAV_KEY)?.[userId] ?? [];
  },
};
