import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class HttpBooksService {
  constructor(private readonly client: HttpService) {}

  findAll(): Promise<unknown[]> {
    const res$ = this.client.get('http://localhost:4730/books');

    const p = res$.toPromise().then((value) => {
      return value.data;
    });

    return p;
  }
}
