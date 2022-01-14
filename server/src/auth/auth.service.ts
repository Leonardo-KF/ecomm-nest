import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Logindto, Authres } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    constructor(private database: PrismaService, private jwt: JwtService) {};

    async Login (data: Logindto): Promise<Authres> {
        const  { email, password } = data;
        const user = await this.database.user.findUnique({
            where: { email}
        })

        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        const validhash = await bcrypt.compare(password, user.password);

        if (!validhash) {
            throw new UnauthorizedException("Email ou senha incorretos")
        }

        delete user.password;

        return {
            token: this.jwt.sign({email}),
            user
        }
    }

}
