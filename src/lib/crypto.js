export const crypto = {
  uuid() {
    if (window.crypto) {
      return window.crypto.randomUUID();
    }
    return Math.random();
  },
};
