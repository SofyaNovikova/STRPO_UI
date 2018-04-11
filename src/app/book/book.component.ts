import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { GenreService } from '../genre.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  id: string = '';
  book: any;
  newReview = {
    author: '',
    content: '',
    rate: 0,
    bookId: ''
  }

  constructor(private route: ActivatedRoute, private router: Router, private _bookService: BookService, private _genreService: GenreService) {
    this.route.params.subscribe(res => {
      this.id = res.id;
      this.newReview.bookId = res.id
    });
  }

  ngOnInit() {
    this._bookService.getBook(this.id).subscribe(res => {
      this.book = JSON.parse(res.text());
      this.book.averageRate = 0; // this.getAverageRate(this.book.rating);
    });
  }

  getAverageRate(rating) {
    if (rating.length) {
      const sum = rating.reduce((sum, value) => sum + parseInt(value), 0);
      return Math.round(sum / rating.length);
    }
    return 0;
  }

  setRating(event) {
    const rate = parseInt(event.target.value);
    this.newReview.rate = rate;
  }

  editBook(id) {
    this.router.navigate(['/book/create'], { queryParams: { book: id } });
  }

  deleteBook(id) {
    this._bookService.deleteBook(id).subscribe(() => this.router.navigate(['/books']));
  }

  createReview() {
    this._bookService.createReview(this.newReview).subscribe(() => {
      const review = { ...this.newReview };
      this.book.reviews.push(review);
      this.newReview = {
        author: '',
        content: '',
        rate: 0,
        bookId: ''
      }
    })
  }

}
