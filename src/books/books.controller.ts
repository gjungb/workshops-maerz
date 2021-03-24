import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
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
  readBookByIsbn(@Param('isbn') isbn: string): Promise<unknown> {
    // console.log(this);
    // this.foo = await this.booksService.findOne(isbn)
    // do some stuff
    // const {author} = this.foo
    // const res = await this.db.getStuff(author);
    // return {foo: this.foo, res: res};
    return this.booksService.findOne(isbn);
  }

  /**
   * Returns a  list of books
   * @returns
   */
  @Get()
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @ApiOperation({ description: 'A list of books' })
  readBooks(): Observable<unknown[]> {
    return this.booksService.findAll();
  }
}
