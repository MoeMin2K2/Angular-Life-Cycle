import { Component, OnInit } from '@angular/core';
import { Book, BookService } from './book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})

export class BookListComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { title: '', author: '' };
  selectedBook: Book | null = null;

  // assign for edit
  editBook: Book = { title: '', author: '' };
  editing: boolean = false;

  constructor(private bookService: BookService) {}

  loadBooks(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  addBook(): void {
    this.bookService.addBook(this.newBook).subscribe((book) => {
      this.books.push(book);
      console.log("Add Book: ",this.books);
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

  updateBook(): void {
    if (this.editBook && this.editBook.id != null) {
      this.bookService.updateBook(this.editBook).subscribe((updatedBook) => {
        //find index of update book
        const index = this.books.findIndex(book => book.id === updatedBook.id);
        if (index !== -1) {
          this.books[index] = updatedBook;
        }
        //after update , to show add field
        this.cancelEdit();
      });
    }
  }

  cancelEdit(): void {
    this.editBook = { title: '', author: '' };
    this.editing = false;
    this.selectedBook = null;
  }

  deleteBook(id?: number): void {
    console.log("Delete ID: ",  id);
    this.bookService.deleteBook(id).subscribe(() => {
      //load function called
      this.loadBooks();
      //after delete , to show add field
      this.cancelEdit();
    });
  }
}
