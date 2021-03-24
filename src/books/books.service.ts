import { Injectable } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CreateBookDto } from './create-book-dto';

@Injectable()
export class BooksService {
  private books: ReadonlyArray<any> = [
    {
      title: 'NestJS Beginner Book by Angular.DE',
      subtitle: 'From Angular to Nest in just a few pages',
      isbn: '978-0-20163-361-0',
      abstract: 'Awesome abstract for an awesome book.',
      numPages: 395,
      author: 'Robin Böhm',
      publisher: {
        name: 'Workshops.DE Publisher',
        url: 'http://www.workshops.de/',
      },
    },
    {
      title: 'Nest and HTTP',
      subtitle: 'Special Http usecases for microservices with NestJS',
      isbn: '978-3-86490-120-1',
      abstract: 'Build to scale',
      numPages: 330,
      author: 'Gerd Jungbluth',
      publisher: {
        name: 'Workshops.DE Publisher',
        url: 'http://www.workshops.de/',
      },
    },
    {
      title: 'Eloquent NestJS',
      subtitle: 'Ninja Style NestJS tips & tricks',
      isbn: '978-1-59327-584-6',
      abstract: 'Every professionell NestJS Developer should read this book',
      numPages: 472,
      author: 'Sascha Nuissl',
      publisher: {
        name: 'Workshops.DE Publisher',
        url: 'http://www.workshops.de/',
      },
    },
  ];

  /**
   *
   * @param payload
   * @returns
   */
  async create(payload: CreateBookDto): Promise<number> {
    this.books = [...this.books, payload];
    return this.books.length;
  }

  /**
   *
   * @param isbn
   * @returns
   */
  findOne(isbn: string): Promise<unknown> {
    const book = this.books.find((book) => book.isbn === isbn);

    if (book) {
      return Promise.resolve(book);
    }
    return Promise.reject(`No book found for ISBN ${isbn}`);
  }

  /**
   *
   * @returns
   */
  findAll(): Observable<unknown[]> {
    return of([...this.books]).pipe(
      switchMap(() => throwError('Database is down')),
    );
  }
}
