import { ApiParam, ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsISBN,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({
    name: 'title',
    description: 'The book title',
    example: 'The great book',
  })
  title: string;

  @IsISBN()
  isbn: string;

  @IsNumber()
  @IsInt()
  @IsOptional()
  numPages?: number;
}
