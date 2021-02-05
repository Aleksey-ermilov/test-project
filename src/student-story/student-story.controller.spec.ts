import { Test, TestingModule } from '@nestjs/testing';
import { StudentStoryController } from './student-story.controller';

describe('StudentStoryController', () => {
  let controller: StudentStoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentStoryController],
    }).compile();

    controller = module.get<StudentStoryController>(StudentStoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
