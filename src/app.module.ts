import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { HttpBooksService } from './http-books/http-books.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, BooksController],
  providers: [
    AppService,
    { provide: BooksService, useClass: BooksService },
    { provide: 'EXTERNAL_API', useValue: 'http://localhost:4730/books' },
  ],
  exports: [BooksService],
})
export class AppModule {}
