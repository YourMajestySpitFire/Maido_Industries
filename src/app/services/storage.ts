import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.type';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): Theme | null {
    const item = localStorage.getItem(key);

    if (!item) return null;

    return item as Theme;
  }
}
