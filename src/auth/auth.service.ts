import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  //dependency inject inside constructor it is provided by jwt.
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User) {
    const payload = { username: user.username, userId: user.id };
    const token = this.jwtService.sign(payload);
    return {token: token}
  }
}
