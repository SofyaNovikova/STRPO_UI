import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import config from './config';

@Injectable()
export class AuthorService {

  private authors = new BehaviorSubject<any>([]);
  author = this.authors.asObservable();

  constructor(private http: Http) {
    this.getAuthors();
  }

  getAuthors() {
    let url = `${config.backendUrl}/authors`;
    this.http.get(url).subscribe(res => this.changeAuthor(JSON.parse(res.text())));
  }

  loadAuthors() {
    let url = `${config.backendUrl}/authors`;
    return this.http.get(url);
  }

  getAuthor(id) {
    let url = `${config.backendUrl}/authors/${id}`;
    return this.http.get(url);
  }

  changeAuthor(author) {
    this.authors.next(author)
  }

  createAuthor(author) {
    let url = `${config.backendUrl}/authors`;
    return this.http.post(url, author);
  }

  updateAuthor(author) {
    let url = `${config.backendUrl}/authors/${author.id}`;
    return this.http.put(url, author);
  }

  deleteAuthor(id) {
    let url = `${config.backendUrl}/authors/${id}`;
    return this.http.delete(url);
  }
}
