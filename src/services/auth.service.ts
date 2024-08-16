import { inject, injectable } from "inversify";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { SignUpDto, SignInDto } from "../dtos/auth.dto";
import { AuthResponse } from "../common/types/auth-response.type";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../environment/variable.env";

@injectable()
export class AuthService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  public async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const { email, password, username } = signUpDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create new user
    const newUser = new User();
    newUser.email = email;
    newUser.username = username;
    newUser.password = hashedPassword;
    const user = await this.userRepository.create(newUser);

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  public async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    const { email, password } = signInDto;

    // Find the user
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  private generateToken(user: User): string {
    const payload = { id: user.id, email: user.email, role: user.role };
    return jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
  }
}
