import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authors = [];
  search: string = '';
  filteredAuthors = [];

  constructor(private _authorService: AuthorService, private router: Router) { }

  ngOnInit() {
    this._authorService.author.subscribe(res => {
      this.authors = res;
      this.filteredAuthors = this.authors;
    });
  }

  ngAfterContentInit() {
    this._authorService.getAuthors();
  }

  navigateToAuthor(id) {
    this.router.navigate([`author/${id}`]);
  }

  navigateToCreateAuthor() {
    this.router.navigate([`author/create`]);
  }

  onSearchChange() {
    if (this.search) {
      this.filteredAuthors = this.authors.filter((author) => {
        return author.name.includes(this.search) || author.years.includes(this.search);
      })
    } else {
      this.filteredAuthors = this.authors;
    }
  }
}
