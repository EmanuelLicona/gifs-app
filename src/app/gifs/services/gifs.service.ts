import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _gifList: Gif[] = []
  private _tagsHistory: string[] = []
  private apiKey = 'WcJFniX6j1UyPsxsqFyhDFJQoPFKt65m'
  private urlBase = `https://api.giphy.com/v1/gifs`

  constructor(
    private http: HttpClient
  ) { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  get gifList(): Gif[] {
    return this._gifList;
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    this._tagsHistory = this.tagsHistory.filter(x => x !== tag);
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
  }

  searchTag(tag: string): void {
    if (tag.length == 0) return;
    if(this.tagsHistory.indexOf(tag) === 0) return

    this.organizeHistory(tag)

    // fetch(this.urlBase + tag)
    //   .then(resp => resp.json())
    //   .then(resp => {
    //     this.organizeHistory(tag)
    //     console.log(resp)
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    this.http.get<SearchResponse>(this.urlBase + '/search', { params })
      .subscribe(resp => {
        this._gifList = resp.data;
      });
  }

}
