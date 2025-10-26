type StorageType = 'local' | 'session';

class Storage {
  private storage: globalThis.Storage;

  constructor(type: StorageType = 'local') {
    this.storage = type === 'local' ? localStorage : sessionStorage;
  }

  set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to storage: ${error}`);
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = this.storage.getItem(key);
      if (item === null) {
        return defaultValue ?? null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from storage: ${error}`);
      return defaultValue ?? null;
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from storage: ${error}`);
    }
  }

  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error(`Error clearing storage: ${error}`);
    }
  }

  has(key: string): boolean {
    return this.storage.getItem(key) !== null;
  }

  keys(): string[] {
    return Object.keys(this.storage);
  }
}

export const localStorage = new Storage('local');
export const sessionStorage = new Storage('session');

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar_state',
  RECENT_SEARCHES: 'recent_searches',
  FILTER_SETTINGS: 'filter_settings',
  TABLE_COLUMNS: 'table_columns',
  DASHBOARD_LAYOUT: 'dashboard_layout',
} as const;
