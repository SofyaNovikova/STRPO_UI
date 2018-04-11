import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import config from './config';

@Injectable()
export class BookService {
  private authors = new BehaviorSubject<any>([]);
  author = this.authors.asObservable();

  private books = new BehaviorSubject<any>([]);
  book = this.books.asObservable();

  constructor(private http: Http) {}

  getBooks() {
    let url = `${config.backendUrl}/books`;
    this.http.get(url).subscribe(res => this.changeBook(JSON.parse(res.text())));
  }

  loadBooks() {
    let url = `${config.backendUrl}/books`;
    return this.http.get(url);
  }

  changeBook(book) {
    this.books.next(book)
  }

  getBook(id) {
    let url = `${config.backendUrl}/books/${id}`;
    return this.http.get(url);
  }

  createBook(book) {
    book = this._prepareBook(book);
    let url = `${config.backendUrl}/books`;
    return this.http.post(url, book);
  }

  updateBook(book) {
    book = this._prepareBook(book);
    let url = `${config.backendUrl}/books/${book.id}`;
    return this.http.put(url, book);
  }

  _prepareBook(_book) {
    const book = { ..._book };
    delete book.averageRate;
    return book;
  }

  deleteBook(id) {
    let url = `${config.backendUrl}/books/${id}`;
    return this.http.delete(url);
  }

  createReview(review) {
    let url = `${config.backendUrl}/reviews`;
    return this.http.post(url, review);
  }

}
