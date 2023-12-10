import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: Prisma.PostCreateInput) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query('skip') skip: number = 0, @Query('take') take: number = 10) {
    return this.postsService.findAll({ skip, take });
  }

  @Get('user/:id')
  findAllUser(@Param('id') id: string) {
    return this.postsService.findAllUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: Prisma.PostUpdateInput,
  ) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
