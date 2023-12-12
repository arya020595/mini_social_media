import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
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

  update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });
  }

  remove(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
