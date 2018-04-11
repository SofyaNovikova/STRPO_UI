import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../author.service';
import { GenreService } from '../genre.service';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  book = {
    id: '',
    name: '',
    content: '',
    photo: '',
    genreId: '',
    authorId: '',
    publisherId: ''
  }

  id: string = '';
  genres: any;
  authors: any;
  publishers: any;
  authorDisabled: boolean = false;
  error: string = '';

  constructor(private _authorService: AuthorService, private router: Router,
    private route: ActivatedRoute, private _genreService: GenreService,
    private _bookService: BookService, private _publisherSevice: PublisherService) { }

  ngOnInit() {
    this._genreService.genre.subscribe(res => this.genres = res);
    this._authorService.author.subscribe(res => this.authors = res);
    this._publisherSevice.publisher.subscribe(res => this.publishers = res);
    this.route
      .queryParams
      .subscribe(params => {
        this.book.authorId = params['author'] || '';
        this.book.id = params['book'] || '';
        this.authorDisabled = !!this.book.authorId;

        if (this.book.id) {
          this._bookService.loadBooks().subscribe(res => {
            const books = JSON.parse(res.text());
            this.setBookToUpdate(this.book.id, books);
          });
        }
      });
  }

  setBookToUpdate(id, books) {
    const book = id && books.filter(item => item.id === id)[0];
    if (book) {
      this.book = { ...book };
    }
  }

  handleFileInput(files) {
    this.onInputChange();
    const image = files.item(0);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.book.photo = reader.result;
    }, false);
    reader.readAsDataURL(image);
  }

  createBook() {
    if (this.validateBook()) {
      if (this.book.id) {
        this._bookService.updateBook(this.book).subscribe(res => {
          this.book = JSON.parse(res.text());
          this.goBack();
        });
      } else {
        this._bookService.createBook(this.book).subscribe(res => {
          this.book = JSON.parse(res.text());
          this.goBack();
        }, error => {
          if (error.status === 413) {
            this.error = 'Размер фото превышает лимит. Пожалуйста загрузите фото меньшего разрешения.'
          }
        });
      }
    }
  }

  onInputChange() {
    this.error = '';
  }

  goBack() {
    if (this.authorDisabled) {
      this.router.navigate([`/author/${this.book.authorId}`]);
    } else if (this.book.id) {
      this.router.navigate([`/book/${this.book.id}`]);
    } else {
      this.router.navigate([`/books`]);
    }
  }

  validateBook() {
    if (!this.book.name.trim()) {
      this.error = 'Проверьте, что Вы ввели название книги';
      return false;
    }
    if (!this.book.authorId) {
      this.error = 'Проверьте, что Вы указали автора книги';
      return false;
    }
    if (!this.book.genreId) {
      this.error = 'Проверьте, что Вы указали жанр книги';
      return false;
    }
    if (!this.book.publisherId) {
      this.error = 'Проверьте, что Вы указали издательство';
      return false;
    }
    if (!this.book.content) {
      this.error = 'Проверьте, что Вы ввели описание книги';
      return false;
    }
    return true;
  }

}
