import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  create(createLikeDto: Prisma.LikeCreateInput) {
    return this.prisma.like.create({
      data: createLikeDto,
    });
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  // remove(authorId: number, postId: number) {
  //   return this.prisma.like.delete({
  //     where: {
  //       authorId,
  //       postId,
  //     },
  //   });
  // }
}
