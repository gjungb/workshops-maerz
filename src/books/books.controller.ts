import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  ServiceUnavailableException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, UserData } from 'src/decorators/user.decorator';
import { UserGuard } from 'src/shared/user.guard';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book-dto';

@Controller('books')
@ApiTags('books')
@UseGuards(UserGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createBook(@Body() payload: CreateBookDto): Promise<number> {
    const res = await this.booksService.create(payload);
    // do some stuff
    return res;
  }

  @Get(':isbn')
  @ApiParam({
    name: 'isbn',
    description: 'a valid ISBN',
  })
  async readBookByIsbn(
    @Param('isbn') isbn: string,
    @User() user: UserData,
  ): Promise<unknown> {
    // const foo = this.booksService.findOne(isbn);
    // const bar = this.booksService.findAll();
    // do stuff foo, bar
    // Promise.all([foo, bar]).then((res1, res2) => {});

    console.log(user);

    try {
      const book = await this.booksService.findOne(isbn);
      return book;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  /**
   * Returns a  list of books
   * @returns
   */
  @Get()
  @ApiOperation({ description: 'A list of books' })
  readBooks(): Observable<unknown[]> {
    return this.booksService.findAll().pipe(
      catchError((err: any) => {
        return throwError(new ServiceUnavailableException(err));
      }),
    );
  }
}
