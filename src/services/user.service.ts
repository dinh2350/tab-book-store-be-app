import { inject, injectable } from "inversify";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";
import { GetQueryParams } from "../common/types/get-query-params.type";
import { FindResponseType } from "../common/types/http.type";
import { bcryptHashUtil, bcryptCompareSyncUtil } from "../utils/bcrypt.util";
@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async getAllUsers(
    queryParam: GetQueryParams
  ): Promise<FindResponseType<User[]>> {
    return this.userRepository.findAll(queryParam);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  validatePassword(plainPassword: string, hashedPassword: string): boolean {
    return bcryptCompareSyncUtil(plainPassword, hashedPassword);
  }

  async createUser(user: User): Promise<User> {
    user.password = bcryptHashUtil(user.password);
    return this.userRepository.create(user);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
