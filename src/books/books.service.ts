import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private nextId = 1;

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  create(bookData: Omit<Book, 'id' | 'reserved'>): Book {
    const newBook: Book = {
      id: this.nextId++,
      ...bookData,
      reserved: false,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updatedData: Partial<Book>): Book {
    const bookIndex = this.books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    const updatedBook = { ...this.books[bookIndex], ...updatedData };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  remove(id: number): void {
    const bookIndex = this.books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    this.books.splice(bookIndex, 1);
  }
}