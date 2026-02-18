import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JWTAuthGuard } from './guards/jwt.guard';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    login(@Req() req : any) {
        console.log("It's inside controller login method !");
        return req.user;
    }

    @UseGuards(JWTAuthGuard)
    @Get('status')
    status(@Req() req) {
        console.log("Inside Controller Status method !");
        return req.user;
    }

    @Post('create-account')
    async createAccount(@Body() signupDto : SignupDto ) {
        return this.authService.createNewAccount(signupDto);
    }

    
}


