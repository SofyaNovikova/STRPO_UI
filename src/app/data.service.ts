import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import config from './config';

@Injectable()
export class DataService {
  private authors = new BehaviorSubject<any>([]);
  author = this.authors.asObservable();

  private books = new BehaviorSubject<any>([]);
  book = this.books.asObservable();

  constructor(private http: Http) { }

  getAuthors() {
    let url = `${config.backendUrl}/authors`;
    this.http.get(url).subscribe(res => this.changeAuthor(JSON.parse(res.text())));
  }

  getAuthor(id) {
    let url = `${config.backendUrl}/authors/${id}`;
    return this.http.get(url);
  }

  changeAuthor(author) {
    this.authors.next(author)
  }

  getBooks() {
    let url = `${config.backendUrl}/books`;
    this.http.get(url).subscribe(res => this.changeBook(JSON.parse(res.text())));
  }

  changeBook(book) {
    this.books.next(book)
  }
}
