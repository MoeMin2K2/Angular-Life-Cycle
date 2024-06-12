import { Component, OnInit } from '@angular/core';
import { Book, BookService } from './book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CustomPipePipe } from "../custom-pipe.pipe";

@Component({
    selector: 'app-book-list',
    standalone: true,
    templateUrl: './book-list.component.html',
    styleUrl: './book-list.component.css',
    imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, CustomPipePipe]
})

export class BookListComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { title: '', author: '' };
  selectedBook: Book | null = null;

  // assign for edit
  editBook: Book = { title: '', author: '' };
  editing: boolean = false;

  constructor(private bookService: BookService, private router: Router) {}

  goBack(){
    this.router.navigate(['/welcome']);
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  addBook(): void {

    this.bookService.addBook(this.newBook).subscribe(() => {

      console.log("Add Book: ",this.newBook);
      this.loadBooks();
      
      this.newBook = { title: '', author: '' };
    });
  }

  viewBook(id?: number): void {
    console.log("ViewBook ID: ",  id);
    this.bookService.getBookById(id).subscribe((book) => {
      this.selectedBook = book;
    });
  }

  startEditBook(book: Book): void {
    //assign book to edit
    this.editBook = { ...book };
    this.editing = true;
  }

  //load to add field
  cancelEdit(): void {
    this.editBook = { title: '', author: '' };
    this.editing = false;
    this.selectedBook = null;
  }

  updateBook(): void {
    if (this.editBook && this.editBook.id != null) {
      this.bookService.updateBook(this.editBook).subscribe((updatedBook) => {
        console.log("Updated Book: ", this.editBook);
        this.loadBooks();
        this.cancelEdit();
      });
    }
  }

  deleteBook(id?: number): void {
    console.log("Delete ID: ",  id);
    this.bookService.deleteBook(id).subscribe(() => {
      this.loadBooks();
      this.cancelEdit();
    });
  }
}
