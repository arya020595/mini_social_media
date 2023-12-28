import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SuccessResponse } from 'src/common/response/success-response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ): Promise<SuccessResponse<User>> {
    const createdUser = await this.usersService.create(createUserDto, file);
    return new SuccessResponse<User>(
      true,
      HttpStatus.CREATED,
      `New user ${createdUser.username} created successfully.`,
      createdUser,
    );
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(): Promise<SuccessResponse<User[]>> {
    const users = await this.usersService.findAll();
    return new SuccessResponse(
      true,
      HttpStatus.OK,
      'Resource retrieved successfully.',
      users,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponse<User>> {
    const user = await this.usersService.findOne(id);
    return new SuccessResponse<User>(
      true,
      HttpStatus.OK,
      `User '${user.name}' details retrieved successfully.`,
      user,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<SuccessResponse<User>> {
    const updatedUser = await this.usersService.update(id, updateUserDto, file);
    return new SuccessResponse<User>(
      true,
      HttpStatus.OK,
      `User ${updatedUser.username} updated successfully.`,
      updatedUser,
    );
  }

  @Patch('changePassword/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<SuccessResponse<User>> {
    const passwordUser = await this.usersService.changePassword(
      id,
      updateUserDto,
    );
    return new SuccessResponse<User>(
      true,
      HttpStatus.OK,
      `User ${passwordUser.username} updated successfully.`,
      passwordUser,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponse<User>> {
    const deletedUser = await this.usersService.remove(id);
    return new SuccessResponse<User>(
      true,
      HttpStatus.OK,
      `User ${deletedUser.username} deleted successfully.`,
      deletedUser,
    );
  }
}
