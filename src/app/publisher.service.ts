import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import config from './config';

@Injectable()
export class PublisherService {

  private publishers = new BehaviorSubject<any>([]);
  publisher = this.publishers.asObservable();

  constructor(private http: Http) {
    this.getPublishers();
  }

  getPublishers() {
    let url = `${config.backendUrl}/publishers`;
    this.http.get(url).subscribe(res => this.changePublisher(JSON.parse(res.text())));
  }

  changePublisher(publisher) {
    this.publishers.next(publisher)
  }

  getPublisher(id) {
    let url = `${config.backendUrl}/publishers/${id}`;
    return this.http.get(url);
  }

}
