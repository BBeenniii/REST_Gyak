import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Book[] {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Book {
    return this.booksService.findOne(+id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createBookDto: CreateBookDto): Book {
    return this.booksService.create(createBookDto);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Book {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.booksService.remove(+id);
  }
}

// terminalon keresztül működnek a végpontok
/*
POST:
$headers = @{ "Content-Type" = "application/json" }
$body = '{
    "title": "1984",
    "author": "George Orwell",
    "isbn": "1234567890",
    "publishYear": 1949
}'

Invoke-WebRequest -Uri http://localhost:3000/books -Method POST -Headers $headers -Body $body
*/