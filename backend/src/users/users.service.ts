import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
  ): Promise<User> {
    let userData = updateUserDto;

    // Check if a file is provided
    if (file) {
      // Upload the file to Cloudinary
      const cloudinaryResponse = await this.cloudinary.uploadFile(file);
      // Update the user data with the Cloudinary URL
      userData = {
        ...userData,
        image: cloudinaryResponse.secure_url,
      };
    }

    // Update the user in the database
    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async changePassword(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify the old password
    const isOldPasswordValid = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Invalid old password');
    }

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(
      updateUserDto.password,
      roundsOfHashing,
    );

    // Update the user's password

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
