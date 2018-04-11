import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './author/author.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { PublisherComponent } from './publisher/publisher.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'author/create/:id',
    component: CreateAuthorComponent
  },
  {
    path: 'author/create',
    component: CreateAuthorComponent
  },
  {
    path: 'author/:id',
    component: AuthorComponent
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'book/create',
    component: CreateBookComponent
  },
  {
    path: 'book/:id',
    component: BookComponent
  },
  {
    path: 'publisher/:id',
    component: PublisherComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
