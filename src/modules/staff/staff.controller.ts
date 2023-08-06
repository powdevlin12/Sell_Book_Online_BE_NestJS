import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('/my-self')
  @HttpCode(HttpStatus.OK)
  getMySelf(@Req() req: Request) {
    const user = req?.user;
    console.log(
      '🚀 ~ file: customer.controller.ts:23 ~ CustomerController ~ getMySelf ~ user:',
      user,
    );
    return this.staffService.getMySelf(user['userId']);
  }
}
