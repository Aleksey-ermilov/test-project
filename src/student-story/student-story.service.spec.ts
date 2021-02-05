import { Test, TestingModule } from '@nestjs/testing';
import { StudentStoryService } from './student-story.service';

describe('StudentStoryService', () => {
  let service: StudentStoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentStoryService],
    }).compile();

    service = module.get<StudentStoryService>(StudentStoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
