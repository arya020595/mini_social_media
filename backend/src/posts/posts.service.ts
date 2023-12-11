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

  async findAll({ skip = 0, take = 10 }) {
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take,
        include: {
          author: true,
          _count: {
            select: { likes: true },
          },
        },
      }),
      this.prisma.post.count(), // Fetch total count of posts
    ]);

    const totalPages = Math.ceil(total / take);

    return {
      data: posts,
      total,
      totalPages,
    };
  }

  async findAllUser({ id, skip = 0, take = 10 }) {
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take,
        where: {
          authorId: id,
        },
        include: {
          author: true,
          _count: {
            select: { likes: true },
          },
        },
      }),
      this.prisma.post.count(), // Fetch total count of posts
    ]);

    const totalPages = Math.ceil(total / take);

    return {
      data: posts,
      total,
      totalPages,
    };
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
