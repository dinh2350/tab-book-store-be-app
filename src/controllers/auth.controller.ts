import { Request, Response } from "express";
import {
  controller,
  httpPost,
  requestBody,
  response,
} from "inversify-express-utils";
import { AuthService } from "../services/auth.service";
import { SignUpDto, SignInDto } from "../dtos/auth.dto";

@controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @httpPost("/signup")
  public async signUp(
    @requestBody() signUpDto: SignUpDto,
    @response() res: Response
  ): Promise<void> {
    try {
      const result = await this.authService.signUp(signUpDto);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to sign up" });
    }
  }

  @httpPost("/signin")
  public async signIn(
    @requestBody() signInDto: SignInDto,
    @response() res: Response
  ): Promise<void> {
    try {
      const result = await this.authService.signIn(signInDto);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to sign in" });
    }
  }
}
