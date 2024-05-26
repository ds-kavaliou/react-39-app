import { storage } from "src/lib";
import { STORAGE_HISTORY_KEY } from "./consts";

export const repository = {
  saveHistoryByUserId(userId, history = []) {
    const data = storage.get(STORAGE_HISTORY_KEY) ?? {};
    data[userId] = history;
    storage.set(STORAGE_HISTORY_KEY, data);
  },
  getHistoryByUserId(userId) {
    return storage.get(STORAGE_HISTORY_KEY)?.[userId] ?? [];
  },
};