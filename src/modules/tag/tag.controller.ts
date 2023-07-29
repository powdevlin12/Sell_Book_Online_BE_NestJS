import { Body, Controller, Post } from '@nestjs/common';
import { createTagDTO } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  createTag(@Body() body: createTagDTO) {
    return this.tagService.createTag(body);
  }
}
