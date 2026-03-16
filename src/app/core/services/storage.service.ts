import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private prefix = 'cac_';

  constructor() {}

  set(key: string, value: any): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, serialized);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (item === null) {
        return defaultValue !== undefined ? defaultValue : null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue !== undefined ? defaultValue : null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  clear(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  has(key: string): boolean {
    return localStorage.getItem(this.prefix + key) !== null;
  }

  setSession(key: string, value: any): void {
    try {
      const serialized = JSON.stringify(value);
      sessionStorage.setItem(this.prefix + key, serialized);
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  }

  getSession<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = sessionStorage.getItem(this.prefix + key);
      if (item === null) {
        return defaultValue !== undefined ? defaultValue : null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue !== undefined ? defaultValue : null;
    }
  }

  removeSession(key: string): void {
    try {
      sessionStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  }

  clearSession(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => sessionStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }

  getSize(): number {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(this.prefix)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }
}

