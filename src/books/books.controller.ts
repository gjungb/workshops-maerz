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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book-dto';

@Controller('books')
@ApiTags('books')
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
    return this.booksService.findOne(isbn);
  }

  /**
   * Returns a  list of books
   * @returns
   */
  @Get()
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  @ApiOperation({ description: 'A list of books' })
  readBooks(): Promise<unknown[]> {
    return this.booksService.findAll();
  }
}
