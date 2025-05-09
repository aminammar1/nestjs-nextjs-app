import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signupdto';
import { LoginDto } from './dto/logindto';
import { Response, Request } from 'express';
import {
  ForgetPasswordDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupData: SignUpDto) {
    return this.authService.signup(signupData);
  }

  @Post('login')
  async login(@Body() Credentials: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(Credentials, res);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token found' });
    }
    return this.authService.refreshTokens(refreshToken, res);
  }

  /** Request Password Reset (Send OTP) */
  @Post('forgot-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.requestPasswordReset(forgetPasswordDto.email);
  }

  /** Verify OTP */
  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOTP(verifyOtpDto.email, verifyOtpDto.otp);
  }

  /** Reset Password (After OTP Verification) */
  @Put('reset-password/:userId')
  async resetPassword(
    @Param('userId') userId: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(
      userId,
      resetPasswordDto.newPassword,
      resetPasswordDto.confirmPassword,
    );
  }

  /** Rsend OTP code  */

  @Post('resend-otp')
  async resendOtp(@Body() { email }: { email: string }) {
    return this.authService.resendOTP(email);
  }

  /** Logout  */
  @Post('logout')
  async logout(@Res() res: Response) {
    // Clear access_token cookie
    res.clearCookie('access_token');
    return res.send({ success: true, message: 'Logged out successfully' });
  }

  @Post('google')
  async googleLogin(
    @Body() body: { email: string; name: string; photo: string },
    @Res() res: Response,
  ) {
    const result = await this.authService.googleAuth(body, res);
    return res.status(200).json(result);
  }

  @Post('facebook')
  async facebookLogin(
    @Body() body: { email: string; name: string; photo: string },
    @Res() res: Response,
  ) {
    const result = await this.authService.facebookAuth(body, res);
    return res.status(200).json(result);
  }
}
