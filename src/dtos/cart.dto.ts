export class CreateCartDto {
  created_by!: number;
}

export class AddBookToCartDto {
  userId?: number;
  bookId!: number;
  quantity!: number;
}
