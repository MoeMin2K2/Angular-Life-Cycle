import { Injectable } from '@angular/core';

export interface Book {
  title: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Book[] = [
    { title: 'Java Developer', author: 'java' },
    { title: 'Web Design', author: 'web' },
    { title: 'Mobile Dev', author: 'mobile' }
  ];

  constructor() { }

  getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  deleteBook(index: number): void {
    this.books.splice(index, 1);
  }

}
