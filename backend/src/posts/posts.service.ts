import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: Prisma.PostCreateInput) {
    return this.prisma.post.create({
      data: createPostDto,
    });
  }

  findAll({ skip = 0, take = 10 }) {
    return this.prisma.post.findMany({
      skip,
      take,
      include: {
        author: true,
        _count: {
          select: { likes: true },
        },
      },
    });
  }

  findAllUser(id: number) {
    return this.prisma.post.findMany({
      where: {
        authorId: id,
      },
      include: {
        _count: {
          select: { likes: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
  }

  update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
