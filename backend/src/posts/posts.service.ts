import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const { caption, tag, image, published, authorId } = createPostDto;
    return this.prisma.post.create({
      data: {
        caption,
        tag,
        image,
        published,
        authorId,
      },
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

  async findAllUser({ authorId, skip = 0, take = 10 }) {
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take,
        where: {
          authorId: authorId,
        },
        include: {
          author: true,
          _count: {
            select: { likes: true },
          },
        },
      }),
      this.prisma.post.count({
        where: {
          authorId: authorId,
        },
      }), // Fetch total count of posts for the specified author
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

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const existingPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!existingPost) {
      throw new NotFoundException(`Post with ${id} does not exist.`);
    }

    const updatedPost = await this.prisma.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });

    if (updatedPost) {
      return updatedPost;
    } else {
      throw new Error(`Failed to update post with ID ${id}.`);
    }
  }

  async remove(id: number): Promise<Post> {
    const existingPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!existingPost) {
      throw new NotFoundException(`Post with ${id} does not exist.`);
    }

    const deleteLikes: Prisma.BatchPayload = await this.prisma.like.deleteMany({
      where: {
        postId: id,
      },
    });

    const deletedPost: Post | Prisma.BatchPayload =
      await this.prisma.post.delete({
        where: {
          id,
        },
      });

    const transactionFunction = async (prisma: PrismaClient) => {
      return [deleteLikes, deletedPost];
    };

    const transaction = await this.prisma.$transaction(transactionFunction);

    if (deletedPost) {
      return deletedPost;
    } else {
      throw new Error(`Failed to delete post with ID ${id}.`);
    }
  }
}
