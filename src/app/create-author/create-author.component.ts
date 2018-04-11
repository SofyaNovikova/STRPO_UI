import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {
  author = {
    name: '',
    years: '',
    content: '',
    photo: ''
  }

  id: string = '';
  authors: any;

  constructor(private _authorService: AuthorService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(res => this.id = res.id);
    this._authorService.author.subscribe(res => this.authors = res);
  }

  ngOnInit() {
    if (this.id && this.authors.length) {
      this._authorService.loadAuthors().subscribe(res => {
        const authors = JSON.parse(res.text());
        this.setAuthorToUpdate(this.id, authors);
      });
    } else {
      this.setAuthorToUpdate(this.id, this.authors);
    }
  }

  setAuthorToUpdate(id, authors) {
    const author = id && authors.filter(item => item.id === id)[0];
    if (author) {
      this.author = { ...author };
    }
  }

  createAuthor() {
    if (this.id) {
      this._authorService.updateAuthor(this.author).subscribe(res => {
        this.author = JSON.parse(res.text());
        this.goBack();
      });
    } else {
      this._authorService.createAuthor(this.author).subscribe(res => {
        this.author = JSON.parse(res.text());
        this.goBack();
      });
    }
  }

  handleFileInput(files) {
    const image = files.item(0);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.author.photo = reader.result;
    }, false);
    reader.readAsDataURL(image);
  }

  goBack() {
    this.router.navigate([`/`]);
  }

}
