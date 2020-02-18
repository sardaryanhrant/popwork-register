/**
 * Gets keys value from storage
 * @param {string} key in local storage
 * @returns {any}
 */

export function getFromLocalStorage(key: string): any {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

/**
 * Removes key with value from storage
 * //@param { string } key
 */
export function removeFromLocalStorage(key: string | string[]) {
  key = Array.isArray(key) ? key : [key];
  key.map((k: string) => localStorage.removeItem(k));
}

/**
 * Sets the key to storage with given values
//  * @param {string} key will be saved in local storage
//  * @param data
 */
export function setToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    localStorage.setItem(key, data);
  }
}

/**
 * Clear local storage
 */
export function clearLocalStorage() {
  localStorage.clear();
}
