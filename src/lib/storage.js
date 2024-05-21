export const storage = {
  get(key) {
    try {
      const serialized = localStorage.getItem(key);

      return serialized && JSON.parse(serialized);
    } catch (err) {
      console.error("Could not load by presented key", err);
    }
  },
  set(key, state) {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(key, serialized);
    } catch (err) {
      console.error("Could not save state", err);
    }
  },
};
