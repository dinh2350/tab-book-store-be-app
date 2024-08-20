export class CreateOrderDto {
  createdBy!: number;
  cartId!: number;
}

export class CheckoutCartDto {
  cartId!: number;
  createdBy!: number;
}
