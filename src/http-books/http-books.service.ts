import { HttpService, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

@Injectable()
export class HttpBooksService {
  constructor(
    private readonly client: HttpService,
    @Inject('EXTERNAL_API') private readonly url: string,
  ) {}

  findAll(): Observable<unknown[]> {
    return this.client.get(this.url).pipe(
      // delay(2000),
      map((value) => value.data),
      tap((res) => console.log(res)),
    );
  }
}
