import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { TagEntity } from '../entities/tag.entity';
import { TagPostDto } from './dto/tag.post.dto';

@Injectable()
export class TagService {

  constructor() {
  }

  async getAllTags() {
    const tagRepository = getRepository(TagEntity);
    return await tagRepository.find()
  }

  async createTag(createTag: TagPostDto) {
    const tagRepository = getRepository(TagEntity);
    const tag = tagRepository.create();
    tag.value = createTag.value;
    return await tagRepository.save(tag);
  }

  async deleteTag(tagId: string) {
    const tagRepository = getRepository(TagEntity);
    return await tagRepository.delete({id: tagId});
  }

}
