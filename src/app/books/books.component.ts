import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books = [];
  authors = [];
  filteredBooks = [];
  search: string = '';

  constructor(private _bookService: BookService, private router: Router, private _authorService: AuthorService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this._authorService.author.subscribe(res => {
      this.authors = res;
      this._bookService.loadBooks().subscribe((res) => {
        this.books = JSON.parse(res.text());
        this.books.forEach((book) => {
          book.author = this.authors.filter(author => author.id === book.authorId)[0];
        });

        this.filteredBooks = this.books;
      });
    });
  }

  navigateToBook(id) {
    this.router.navigate([`book/${id}`]);
  }

  navigateToCreateBook() {
    this.router.navigate([`book/create`]);
  }

  onSearchChange() {
    if (this.search) {
      this.filteredBooks = this.books.filter((book) => {
        return book.name.includes(this.search) || book.author.name.includes(this.search);
      })
    } else {
      this.filteredBooks = this.books;
    }
  }

}
