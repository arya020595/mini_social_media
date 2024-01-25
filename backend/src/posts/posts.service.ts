import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
    authorId: number,
  ): Promise<Post> {
    let postData = createPostDto;

    // Check if a file is provided
    if (file) {
      // Upload the file to Cloudinary
      const cloudinaryResponse = await this.cloudinary.uploadFile(file);
      // Update the user data with the Cloudinary URL
      postData = {
        ...postData,
        imageUrl: cloudinaryResponse.secure_url,
        imageId: cloudinaryResponse.public_id,
      };
    }

    const { caption, tag, imageUrl, imageId, published } = postData;

    return this.prisma.post.create({
      data: {
        caption,
        tag,
        imageUrl,
        imageId,
        published,
        authorId,
      },
    });
  }

  async findAll({ skip = 0, take = 10, searchTerm = '' }) {
    let whereClause = {};

    // If a search term is provided, construct the whereClause to search in "caption" or "tags".
    if (searchTerm !== '') {
      whereClause = {
        OR: [
          {
            caption: {
              contains: searchTerm,
            },
          },
          {
            tag: {
              contains: searchTerm,
            },
          },
        ],
      };
    }

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
        where: whereClause,
        include: {
          author: true,
          likes: true,
          _count: {
            select: { likes: true },
          },
        },
      }),
      this.prisma.post.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(total / take);

    return {
      data: posts,
      total,
      totalPages,
    };
  }

  async findAllUser({ authorId, skip = 0, take = 10, searchTerm = '' }) {
    interface WhereClause {
      OR?: Array<
        { caption: { contains: string } } | { tag: { contains: string } }
      >;
      authorId?: number;
    }

    let whereClause: WhereClause = {};
    // If a search term is provided, construct the whereClause to search in "caption" or "tags".
    whereClause = {
      OR: [
        {
          caption: {
            contains: searchTerm,
          },
        },
        {
          tag: {
            contains: searchTerm,
          },
        },
      ],
    };

    if (authorId) {
      whereClause.authorId = authorId;
    }

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
        where: whereClause,
        include: {
          author: true,
          likes: true,
          _count: {
            select: { likes: true },
          },
        },
      }),
      this.prisma.post.count({
        where: whereClause,
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
    return this.prisma.post.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.prisma.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });

    return updatedPost;
  }

  async remove(id: number): Promise<Post> {
    const deletedPost: Post = await this.prisma.post.delete({
      where: {
        id,
      },
    });

    return deletedPost;
  }
}
