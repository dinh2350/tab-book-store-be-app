import { ORDER_ENUM } from "../enums/order.enum";

export interface GetQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: ORDER_ENUM;
}
