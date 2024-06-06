import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent implements  OnInit{
  books!: Book[];
  newBook: Book = { title: '', author: '' };

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
    console.log("Books: ", this.books);
  }

  addBook(): void {
      this.bookService.addBook(this.newBook);
      this.newBook = {title :'', author :''};
      console.log("After Add: ",this.books);
  }

  deleteBook(index: number): void {
    this.bookService.deleteBook(index);
    console.log("After Delete: ",this.books);
  }

}
