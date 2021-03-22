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
    { provide: BooksService, useClass: HttpBooksService },
    { provide: 'EXTERNAL_API', useValue: 'http://...' },
  ],
})
export class AppModule {}
