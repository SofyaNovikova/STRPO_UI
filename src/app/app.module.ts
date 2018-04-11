import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { YaCoreModule } from 'angular2-yandex-maps';
import { YaMapsAPILoader } from 'angular2-yandex-maps/lib/services/ya-maps-loader';
import { WindowRef, DocumentRef } from 'angular2-yandex-maps/lib/utils/browser-globals';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { AuthorService } from './author.service';
import { BookService } from './book.service';
import { GenreService } from './genre.service';
import { PublisherService } from './publisher.service';

import { AuthorComponent } from './author/author.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { PublisherComponent } from './publisher/publisher.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    BooksComponent,
    BookComponent,
    CreateAuthorComponent,
    CreateBookComponent,
    PublisherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgSelectModule,
    YaCoreModule
  ],
  providers: [AuthorService, BookService, GenreService,
    PublisherService, YaMapsAPILoader, WindowRef, DocumentRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
