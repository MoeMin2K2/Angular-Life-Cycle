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

  isLoggedIn(): boolean {
    console.log("Token",sessionStorage.getItem('token'));
    const token = localStorage.getItem('token');
    return token != null; 
    // return !!sessionStorage.getItem('token'); !! return boolean if token present return true, if not or null return false
  }

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
