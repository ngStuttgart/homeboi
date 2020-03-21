import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagPostDto } from './dto/tag.post.dto';

@Controller('tags')
export class TagController {

  constructor(private readonly tagService: TagService) {}

  @Get('')
  getAllTags() {
    return this.tagService.getAllTags();
  }

  @Post('')
  createTag(@Body() tag: TagPostDto) {
    return this.tagService.createTag(tag);
  }

  @Delete(':tagId')
  deleteTag(@Param('tagId') tagId: string) {
    return this.tagService.deleteTag(tagId);
  }


}
