import { Injectable } from '@nestjs/common';
import { Like } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const existingLike = await this.prisma.like.findFirst({
      where: {
        authorId: createLikeDto.authorId,
        postId: createLikeDto.postId,
      },
    });

    if (!existingLike) {
      return await this.prisma.like.create({
        data: createLikeDto,
      });
    }
  }

  async remove(createLikeDto: CreateLikeDto): Promise<Like> {
    const existingLike = await this.prisma.like.findFirst({
      where: {
        authorId: createLikeDto.authorId,
        postId: createLikeDto.postId,
      },
    });

    if (existingLike) {
      return this.prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    }
  }
}
