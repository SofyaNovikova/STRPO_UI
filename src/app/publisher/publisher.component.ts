import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {
  id: string = '';
  publisher: any;

  constructor(private route: ActivatedRoute, private router: Router, private _publisherService: PublisherService) {
    this.route.params.subscribe(res => this.id = res.id);
  }

  ngOnInit() {
    this._publisherService.getPublisher(this.id).subscribe(res => this.publisher = JSON.parse(res.text()));
  }

}
