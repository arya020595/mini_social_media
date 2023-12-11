import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createPostDto: Prisma.PostCreateInput) {
    return this.postsService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number = 0,
    @Query('take', ParseIntPipe) take: number = 10,
  ) {
    return this.postsService.findAll({ skip, take });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('user/:id')
  findAllUser(
    @Param('id', ParseIntPipe) id: number,
    @Query('skip', ParseIntPipe) skip: number = 0,
    @Query('take', ParseIntPipe) take: number = 10,
  ) {
    return this.postsService.findAllUser({ id, skip, take });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: Prisma.PostUpdateInput,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
