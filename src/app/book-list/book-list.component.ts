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
import { NumberFormatPipe } from '../number-format.pipe';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  providers: [CustomPipePipe, NumberFormatPipe, FilterPipe],
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, CustomPipePipe, NumberFormatPipe, FilterPipe]
})

export class BookListComponent implements OnInit {

  books: Book[] = [];
  newBook: Book = { title: '', author: '', price: 0 };
  selectedBook: Book | null = null;

  // assign for edit
  editBook: Book = { title: '', author: '', price: 0 };
  editing: boolean = false;
  searchValue: string = '';
  // private upperFirst: CustomPipePipe
  constructor(private bookService: BookService, private router: Router, private upperFirst: CustomPipePipe, private numForm: NumberFormatPipe) { }

  goBack() {
    this.router.navigate(['/welcome']);
  }

  // searchBooks(query: string) {
  //   this.searchQuery = query;
  // }

  onSearchInputChange(event: any) {
    this.searchValue = event.target.value;
  }


  loadBooks(): void {
    this.bookService.getBooks().then((books) => {
      this.books = books;
    }).catch((error) => {
      console.error('Error loading books:', error);
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  addBook(): void {

    this.bookService.addBook(this.newBook).then(() => {

      console.log("Add Book: ", this.newBook);
      this.loadBooks();

      this.newBook = { title: '', author: '', price: 0 };
    }).catch((error) => {
      console.error('Error adding books:', error);
    });
  }

  viewBook(id?: number): void {
    console.log("ViewBook ID: ", id);
    this.bookService.getBookById(id).then((book) => {
      this.selectedBook = book;
    }).catch((error) => {
      console.error('Error view books:', error);
    });
  }

  startEditBook(book: Book): void {
    //assign book to edit
    this.editBook = { ...book };
    this.editing = true;
  }

  //load to add field
  cancelEdit(): void {
    this.editBook = { title: '', author: '', price: 0 };
    this.editing = false;
    this.selectedBook = null;
  }

  updateBook(): void {
    if (this.editBook && this.editBook.id != null) {
      this.bookService.updateBook(this.editBook).then(() => {
        console.log("Updated Book: ", this.editBook);
        this.loadBooks();
        this.cancelEdit();
      }).catch((error) => {
        console.error('Error update books:', error);
      });
    }
  }

  deleteBook(id?: number): void {
    console.log("Delete ID: ", id);
    this.bookService.deleteBook(id).then(() => {
      this.loadBooks();
      this.cancelEdit();
    }).catch((error) => {
      console.error('Error delete books:', error);
    });
  }

  upperFirstInputValue(value: string, field: 'title' | 'author', isUpdate: boolean = false) {
    const transformedValue = this.upperFirst.transform(value);
    if (isUpdate) {
      this.editBook[field] = transformedValue;
    } else {
      this.newBook[field] = transformedValue;
    }
  }

  formatNumber(value: any, field: 'price', isUpdate: boolean = false) {
    const numericValue = value.replace(/,/g, '');
    const transformedValue = this.numForm.transform(numericValue);
    if (isUpdate) {
      this.editBook[field] = transformedValue;
    } else {
      this.newBook[field] = transformedValue;
    }
  }

}
