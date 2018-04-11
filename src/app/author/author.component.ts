import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  id: string = '';
  author: any;

  constructor(private route: ActivatedRoute, private router: Router, private _authorService: AuthorService) {
    this.route.params.subscribe(res => this.id = res.id);
  }

  ngOnInit() {
    this._authorService.getAuthor(this.id).subscribe(res => this.author = JSON.parse(res.text()));
  }

  editAuthor(id) {
    this.router.navigate([`author/create/${id}`]);
  }

  deleteAuthor(id) {
    this._authorService.deleteAuthor(id).subscribe(() => this.router.navigate(['/']));
  }

}
