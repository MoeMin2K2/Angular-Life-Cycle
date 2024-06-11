import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Book {
  id?: number;
  title: string;
  author: string;
}

const URL = 'http://localhost:3000/books/';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<Book[]>(URL);
  }

  getBookById(id?: number) {
    return this.http.get<Book>(`${URL}${id}`);
  }

  addBook(book: Book){
    return this.http.post<Book>(URL, book);
  }

  updateBook(book: Book) {
    return this.http.put<Book>(`${URL}${book.id}`, book);
  }

  deleteBook(id?: number){
    return this.http.delete<void>(`${URL}${id}`);
  }
}
