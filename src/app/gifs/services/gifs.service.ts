import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = []
  constructor() { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    this._tagsHistory = this.tagsHistory.filter(x => x !== tag);
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
  }

  searchTag(tag: string): void {
    if (tag.length == 0) return;

    this.organizeHistory(tag)
  }


}
