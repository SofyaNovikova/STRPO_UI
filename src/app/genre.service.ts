import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import config from './config';

@Injectable()
export class GenreService {
  private genres = new BehaviorSubject<any>([]);
  genre = this.genres.asObservable();

  constructor(private http: Http) {
    this.getGenres();
  }

  getGenres() {
    let url = `${config.backendUrl}/genres`;
    this.http.get(url).subscribe(res => this.changeGenre(JSON.parse(res.text())));
  }

  changeGenre(genre) {
    this.genres.next(genre)
  }
}
