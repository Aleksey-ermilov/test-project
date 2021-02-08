import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

import { StudentStory, StudentStoryDocument } from './schemas/student-story.schemas';

import { UserService } from '../user/user.service';
import { CreateStudentStoryDto } from './dto/create-student-story.dto';
import { TeacherService } from '../user/teacher.service';

@Injectable()
export class StudentStoryService {

  constructor(
    private readonly userService: UserService,
    private readonly teacherService: TeacherService,
    @InjectModel(StudentStory.name) private readonly studentStoryModel: Model<StudentStoryDocument>
  ){}

  async create(createStudentStoryDto: CreateStudentStoryDto) {
    const createStudentStory = new this.studentStoryModel(createStudentStoryDto)
    return await createStudentStory.save()
  }

  async remove({_id},testStoryId:string) { // only teacher
    if (await this.teacherService.isTeacher(_id)){
      return await this.studentStoryModel.findByIdAndRemove(testStoryId)
    }
    return 'Что-то пошло не так с удалением studentStory' // error!
  }

  async findByIdUser({_id}) {
    return await this.studentStoryModel.find({ uid: _id}).exec()
  }

  async findByIdTest(id:string) {
    return await this.studentStoryModel.find({ tid: id}).exec()
  }

}
