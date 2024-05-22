import { storage, crypto } from "src/lib";
import { STORAGE_AUTH_DB_KEY, STORAGE_AUTH_USER_KEY } from "./consts";

export const repository = {
  async signup({ name, email, password }) {
    const db = storage.get(STORAGE_AUTH_DB_KEY) ?? {};

    if (db[email]) {
      throw new Error(`Provided email is already exist`);
    }

    const user = { id: crypto.uuid(), name, email, password };
    db[email] = user;

    storage.set(STORAGE_AUTH_DB_KEY, db);

    delete user.password;
    return user;
  },
  async signin({ email, password }) {
    const db = storage.get(STORAGE_AUTH_DB_KEY) ?? {};

    if (db[email] === undefined || db[email].password !== password) {
      throw new Error(`Incorrect email or password. Try again`);
    }

    const user = db[email];
    delete user.password;
    return user;
  },
  async me() {
    return storage.get(STORAGE_AUTH_USER_KEY);
  },
};
