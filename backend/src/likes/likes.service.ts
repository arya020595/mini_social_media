import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async create(createLikeDto: CreateLikeDto) {
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

  async remove(createLikeDto: CreateLikeDto) {
    const existingLike = await this.prisma.like.findFirst({
      where: {
        authorId: createLikeDto.authorId,
        postId: createLikeDto.postId,
      },
    });

    console.log(existingLike);

    if (existingLike) {
      return this.prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    }
  }
}
