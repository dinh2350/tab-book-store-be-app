export class CreateCartDto {
  createdBy!: number;
}

export class AddBookToCartDto {
  createdBy?: number;
  bookId!: number;
  quantity!: number;
}
