import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './create-book-dto';

@Controller('books')
@ApiTags('books')
export class BooksController {
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

  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() payload: CreateBookDto): number {
    this.books = [...this.books, payload];
    return this.books.length;
  }

  @Get(':isbn')
  @ApiParam({
    name: 'isbn',
    description: 'a valid ISBN',
  })
  readBookByIsbn(@Param('isbn') isbn: string): unknown {
    return this.books.find((book) => book.isbn === isbn);
  }

  /**
   * Returns a  list of books
   * @returns
   */
  @Get()
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @ApiOperation({ description: 'A list of books' })
  readBooks(): unknown[] {
    return [...this.books];
  }
}
