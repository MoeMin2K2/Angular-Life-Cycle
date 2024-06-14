import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Book {
  id?: number;
  title: string;
  author: string;
  price: number;
}

const URL = 'http://localhost:3000/books/';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  isLoggedIn(): boolean {
    console.log("Token", localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    return token != null;
  }

  constructor(private http: HttpClient) { }

  getBooks(): Promise<Book[]> {
    // return firstValueFrom(this.http.get<Book[]>(URL));
    return new Promise((resolve, reject) => {
      this.http.get<Book[]>(URL).toPromise()
        .then(response => resolve(response!))
        .catch(error => reject(error));
    });
  }

  getBookById(id?: number): Promise<Book> {
    // return firstValueFrom (this.http.get<Book>(`${URL}${id}`));
    return new Promise((resolve, reject) => {
      this.http.get<Book>(`${URL}${id}`).toPromise()
        .then(response => resolve(response!))
        .catch(error => reject(error));
    });
  }

  addBook(book: Book): Promise<Book> {
    // return firstValueFrom (this.http.post<Book>(URL, book));
    return new Promise((resolve, reject) => {
      this.http.post<Book>(URL, book).toPromise()
        .then(response => resolve(response!))
        .catch(error => reject(error));
    });
  }

  updateBook(book: Book): Promise<Book> {
    // return firstValueFrom (this.http.put<Book>(`${URL}${book.id}`, book));
    return new Promise((resolve, reject) => {
      this.http.put<Book>(`${URL}${book.id}`, book).toPromise()
        .then(response => resolve(response!))
        .catch(error => reject(error));
    });
  }

  deleteBook(id?: number): Promise<void> {
    // return firstValueFrom (this.http.delete<void>(`${URL}${id}`));
    return new Promise((resolve, reject) => {
      this.http.delete<void>(`${URL}${id}`).toPromise()
        .then(response => resolve(response!))
        .catch(error => reject(error));
    });
  }
}
